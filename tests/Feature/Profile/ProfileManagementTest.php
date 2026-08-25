<?php

namespace Tests\Feature\Profile;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfileManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_their_profile_and_must_reverify_a_changed_email(): void
    {
        Notification::fake();
        $user = User::factory()->create();

        $this->actingAs($user)
            ->patchJson('/api/v1/profile', [
                'name' => 'Updated Name',
                'email' => 'updated@example.com',
                'institution' => 'TAR UMT',
                'biography' => 'Building sustainable tourism software.',
            ])
            ->assertOk()
            ->assertJsonPath('data.name', 'Updated Name')
            ->assertJsonPath('data.email_verified_at', null);

        $user->refresh();

        $this->assertSame('updated@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
        Notification::assertSentTo($user, VerifyEmail::class);
    }

    public function test_user_can_upload_replace_and_remove_an_avatar(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/v1/profile/avatar', [
                'avatar' => UploadedFile::fake()->image('first.jpg', 256, 256),
            ])
            ->assertOk()
            ->assertJsonPath('success', true);

        $firstAvatar = $user->refresh()->avatar;
        Storage::disk('public')->assertExists($firstAvatar);

        $this->actingAs($user)
            ->postJson('/api/v1/profile/avatar', [
                'avatar' => UploadedFile::fake()->image('second.png', 512, 512),
            ])
            ->assertOk();

        $secondAvatar = $user->refresh()->avatar;
        $this->assertNotSame($firstAvatar, $secondAvatar);
        Storage::disk('public')->assertMissing($firstAvatar);
        Storage::disk('public')->assertExists($secondAvatar);

        $this->actingAs($user)
            ->deleteJson('/api/v1/profile/avatar')
            ->assertOk()
            ->assertJsonPath('data.avatar_url', null);

        $this->assertNull($user->refresh()->avatar);
        Storage::disk('public')->assertMissing($secondAvatar);
    }

    public function test_avatar_upload_rejects_unsupported_files(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/v1/profile/avatar', [
                'avatar' => UploadedFile::fake()->create(
                    'payload.svg',
                    50,
                    'image/svg+xml'
                ),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('avatar');

        $this->assertNull($user->refresh()->avatar);
    }

    public function test_profile_routes_require_authentication(): void
    {
        $this->getJson('/api/v1/profile')->assertUnauthorized();
        $this->patchJson('/api/v1/profile', [])->assertUnauthorized();
        $this->deleteJson('/api/v1/profile/avatar')->assertUnauthorized();
    }
}
