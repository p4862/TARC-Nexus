<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class PasswordAndVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_reset_request_does_not_reveal_account_existence(): void
    {
        Notification::fake();
        $user = User::factory()->create(['email' => 'known@example.com']);

        $this->postJson('/api/v1/auth/forgot-password', [
            'email' => 'known@example.com',
        ])
            ->assertAccepted()
            ->assertJsonPath(
                'message',
                'If an account exists for that email, a password reset link has been sent.'
            );

        $this->postJson('/api/v1/auth/forgot-password', [
            'email' => 'unknown@example.com',
        ])
            ->assertAccepted()
            ->assertJsonPath(
                'message',
                'If an account exists for that email, a password reset link has been sent.'
            );

        Notification::assertSentTo($user, ResetPassword::class);
    }

    public function test_user_can_reset_their_password_with_a_valid_token(): void
    {
        $user = User::factory()->create(['email' => 'guest@example.com']);
        $token = Password::createToken($user);

        $this->postJson('/api/v1/auth/reset-password', [
            'email' => $user->email,
            'token' => $token,
            'password' => 'NewSecurePass123',
            'password_confirmation' => 'NewSecurePass123',
        ])->assertOk();

        $this->assertTrue(
            Hash::check('NewSecurePass123', $user->refresh()->password)
        );
    }

    public function test_authenticated_user_can_verify_their_email_from_a_signed_link(): void
    {
        $user = User::factory()->unverified()->create();
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(30),
            [
                'id' => $user->getKey(),
                'hash' => sha1($user->getEmailForVerification()),
            ]
        );

        $this->actingAs($user)
            ->get($verificationUrl)
            ->assertRedirect('/email/verified');

        $this->assertTrue($user->refresh()->hasVerifiedEmail());
    }

    public function test_unverified_user_can_request_another_verification_email(): void
    {
        Notification::fake();
        $user = User::factory()->unverified()->create();

        $this->actingAs($user)
            ->postJson('/api/v1/auth/email/verification-notification')
            ->assertAccepted();

        Notification::assertSentTo($user, VerifyEmail::class);
    }
}
