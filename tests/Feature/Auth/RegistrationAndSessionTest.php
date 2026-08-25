<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RegistrationAndSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_register_and_receives_a_verification_email(): void
    {
        Notification::fake();

        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Nur Aisyah',
            'email' => 'AISYAH@example.com',
            'institution' => 'TAR UMT',
            'role' => UserRole::Guest->value,
            'password' => 'SecurePass123',
            'password_confirmation' => 'SecurePass123',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.email', 'aisyah@example.com')
            ->assertJsonPath('data.role', UserRole::Guest->value)
            ->assertJsonMissingPath('data.password')
            ->assertJsonMissingPath('data.google_id');

        $user = User::query()->where('email', 'aisyah@example.com')->firstOrFail();

        $this->assertAuthenticatedAs($user);
        $this->assertTrue(Hash::check('SecurePass123', $user->password));
        Notification::assertSentTo($user, VerifyEmail::class);
    }

    public function test_public_registration_rejects_the_administrator_role(): void
    {
        $this->postJson('/api/v1/auth/register', [
            'name' => 'Unsafe Administrator',
            'email' => 'admin@example.com',
            'institution' => 'TAR UMT',
            'role' => UserRole::Administrator->value,
            'password' => 'SecurePass123',
            'password_confirmation' => 'SecurePass123',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('role');

        $this->assertDatabaseMissing('users', ['email' => 'admin@example.com']);
    }

    public function test_authenticated_user_cannot_register_another_account(): void
    {
        $this->actingAs(User::factory()->create());

        $this->postJson('/api/v1/auth/register', [
            'name' => 'Second Account',
            'email' => 'second@example.com',
            'institution' => 'TAR UMT',
            'role' => UserRole::Guest->value,
            'password' => 'SecurePass123',
            'password_confirmation' => 'SecurePass123',
        ])->assertForbidden();

        $this->assertDatabaseMissing('users', ['email' => 'second@example.com']);
    }

    public function test_user_can_login_restore_the_session_and_logout(): void
    {
        $user = User::factory()->create([
            'email' => 'guest@example.com',
            'password' => 'SecurePass123',
        ]);

        $this->postJson('/api/v1/auth/login', [
            'email' => 'guest@example.com',
            'password' => 'SecurePass123',
            'remember' => true,
        ])
            ->assertOk()
            ->assertJsonPath('data.id', $user->id);

        $this->getJson('/api/v1/auth/user')
            ->assertOk()
            ->assertJsonPath('data.email', 'guest@example.com');

        $this->postJson('/api/v1/auth/logout')
            ->assertOk()
            ->assertJsonPath('data', null);

        $this->assertGuest();
        $this->getJson('/api/v1/auth/user')->assertUnauthorized();
    }

    public function test_login_returns_a_generic_error_for_invalid_credentials(): void
    {
        User::factory()->create(['email' => 'guest@example.com']);

        $this->postJson('/api/v1/auth/login', [
            'email' => 'guest@example.com',
            'password' => 'WrongPass123',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('email')
            ->assertJsonMissingPath('errors.password');
    }
}
