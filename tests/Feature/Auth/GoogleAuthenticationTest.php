<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_existing_google_user_can_sign_in_by_their_immutable_google_id(): void
    {
        $user = User::factory()->create([
            'email' => 'original@example.com',
            'google_id' => 'google-123',
        ]);

        Socialite::fake('google', $this->googleUser(
            id: 'google-123',
            email: 'different-provider-email@example.com',
        ));

        $this->get('/api/v1/auth/google/redirect')->assertRedirect();
        $this->get('/api/v1/auth/google/callback')
            ->assertRedirect('/profile?google=authenticated');

        $this->assertAuthenticatedAs($user);
        $this->assertSame('original@example.com', $user->refresh()->email);
    }

    public function test_google_login_does_not_auto_link_an_existing_email_account(): void
    {
        $user = User::factory()->create([
            'email' => 'existing@example.com',
            'google_id' => null,
        ]);

        Socialite::fake('google', $this->googleUser(
            id: 'google-456',
            email: 'existing@example.com',
        ));

        $this->get('/api/v1/auth/google/redirect')->assertRedirect();
        $response = $this->get('/api/v1/auth/google/callback');

        $response
            ->assertRedirectContains('/login?')
            ->assertRedirectContains('oauth_error=');

        $this->assertGuest();
        $this->assertNull($user->refresh()->google_id);
    }

    public function test_new_google_user_completes_required_profile_information(): void
    {
        Socialite::fake('google', $this->googleUser(
            id: 'google-new',
            email: 'new@example.com',
            name: 'Google Guest',
        ));

        $this->get('/api/v1/auth/google/redirect?role=Exhibitor')
            ->assertRedirect();
        $this->get('/api/v1/auth/google/callback')
            ->assertRedirect('/register/google');

        $this->getJson('/api/v1/auth/google/pending')
            ->assertOk()
            ->assertJsonPath('data.email', 'new@example.com')
            ->assertJsonPath('data.role', UserRole::Exhibitor->value);

        $this->postJson('/api/v1/auth/google/complete', [
            'name' => 'Google Guest',
            'institution' => 'TAR UMT',
            'role' => UserRole::Exhibitor->value,
        ])
            ->assertCreated()
            ->assertJsonPath('data.google_connected', true)
            ->assertJsonPath('data.email_verified_at', fn ($value) => is_string($value));

        $user = User::query()->where('google_id', 'google-new')->firstOrFail();

        $this->assertAuthenticatedAs($user);
        $this->assertNull($user->password);
        $this->assertTrue($user->hasVerifiedEmail());
    }

    public function test_authenticated_user_can_link_matching_google_account(): void
    {
        $user = User::factory()->create([
            'email' => 'matching@example.com',
            'google_id' => null,
        ]);

        Socialite::fake('google', $this->googleUser(
            id: 'google-link',
            email: 'matching@example.com',
        ));

        $this->actingAs($user)
            ->get('/api/v1/profile/google/redirect')
            ->assertRedirect();
        $this->get('/api/v1/profile/google/callback')
            ->assertRedirect('/profile?google=linked');

        $this->assertSame('google-link', $user->refresh()->google_id);
    }

    public function test_google_linking_rejects_a_different_email_identity(): void
    {
        $user = User::factory()->create([
            'email' => 'profile@example.com',
            'google_id' => null,
        ]);

        Socialite::fake('google', $this->googleUser(
            id: 'google-other',
            email: 'other@example.com',
        ));

        $this->actingAs($user)
            ->get('/api/v1/profile/google/redirect')
            ->assertRedirect();
        $this->get('/api/v1/profile/google/callback')
            ->assertRedirectContains('google_error=');

        $this->assertNull($user->refresh()->google_id);
    }

    private function googleUser(
        string $id,
        string $email,
        string $name = 'Google User',
    ): SocialiteUser {
        return (new SocialiteUser)->map([
            'id' => $id,
            'email' => $email,
            'name' => $name,
        ]);
    }
}
