<?php

namespace App\Services;

use App\Enums\GoogleCallbackOutcome;
use App\Exceptions\GoogleAuthenticationException;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Socialite;

class GoogleAuthenticationService
{
    private const INTENT_KEY = 'authentication.google.intent';

    private const LINK_USER_KEY = 'authentication.google.link_user_id';

    private const PENDING_REGISTRATION_KEY = 'authentication.google.pending_registration';

    private const REGISTRATION_ROLE_KEY = 'authentication.google.registration_role';

    public function __construct(
        private readonly UserRepositoryInterface $users,
    ) {}

    public function redirectForAuthentication(Request $request, ?string $role): RedirectResponse
    {
        $request->session()->put(self::INTENT_KEY, 'authenticate');
        $request->session()->forget([
            self::LINK_USER_KEY,
            self::PENDING_REGISTRATION_KEY,
        ]);

        if ($role === null) {
            $request->session()->forget(self::REGISTRATION_ROLE_KEY);
        } else {
            $request->session()->put(self::REGISTRATION_ROLE_KEY, $role);
        }

        return Socialite::driver('google')
            ->redirectUrl(route('api.v1.auth.google.callback'))
            ->scopes(['openid', 'profile', 'email'])
            ->redirect();
    }

    public function handleAuthenticationCallback(Request $request): GoogleCallbackOutcome
    {
        $this->assertIntent($request, 'authenticate');
        $googleUser = $this->googleUser(route('api.v1.auth.google.callback'));
        [$googleId, $email] = $this->identity($googleUser);

        $user = $this->users->findByGoogleId($googleId);

        if ($user !== null) {
            $this->login($request, $user);
            $this->clearFlow($request);

            return GoogleCallbackOutcome::Authenticated;
        }

        if ($this->users->findByEmail($email) !== null) {
            $this->clearFlow($request);

            throw new GoogleAuthenticationException(
                'An account with this email already exists. Sign in with your password, then connect Google from your profile.'
            );
        }

        $request->session()->put(self::PENDING_REGISTRATION_KEY, [
            'google_id' => $googleId,
            'email' => $email,
            'name' => trim((string) $googleUser->getName()),
            'role' => $request->session()->get(self::REGISTRATION_ROLE_KEY),
            'expires_at' => now()
                ->addMinutes((int) config('authentication.google.pending_registration_minutes'))
                ->getTimestamp(),
        ]);
        $request->session()->forget([
            self::INTENT_KEY,
            self::REGISTRATION_ROLE_KEY,
        ]);

        return GoogleCallbackOutcome::RegistrationRequired;
    }

    /**
     * @return array{email: string, name: string, role: ?string}
     */
    public function pendingRegistration(Request $request): array
    {
        $pending = $this->validPendingRegistration($request);

        return [
            'email' => $pending['email'],
            'name' => $pending['name'],
            'role' => $pending['role'],
        ];
    }

    /**
     * @param  array{name: string, institution: string, role: string}  $attributes
     */
    public function completeRegistration(array $attributes, Request $request): User
    {
        if (Auth::guard('web')->check()) {
            throw new GoogleAuthenticationException(
                'Sign out before registering another account.'
            );
        }

        $pending = $this->validPendingRegistration($request);

        $user = DB::transaction(function () use ($attributes, $pending): User {
            if ($this->users->findByGoogleId($pending['google_id']) !== null
                || $this->users->findByEmail($pending['email']) !== null) {
                throw new GoogleAuthenticationException(
                    'This Google account can no longer be registered. Please sign in or restart the Google flow.'
                );
            }

            return $this->users->create([
                'name' => $attributes['name'],
                'email' => $pending['email'],
                'google_id' => $pending['google_id'],
                'institution' => $attributes['institution'],
                'role' => $attributes['role'],
                'email_verified_at' => now(),
                'password' => null,
            ]);
        });

        $this->login($request, $user);
        $this->clearFlow($request);

        return $user;
    }

    public function redirectForLinking(Request $request): RedirectResponse
    {
        $user = $request->user();

        if (! $user instanceof User) {
            throw new GoogleAuthenticationException('You must be signed in to connect Google.');
        }

        $request->session()->put([
            self::INTENT_KEY => 'link',
            self::LINK_USER_KEY => $user->getKey(),
        ]);

        return Socialite::driver('google')
            ->redirectUrl(route('api.v1.profile.google.callback'))
            ->scopes(['openid', 'profile', 'email'])
            ->redirect();
    }

    public function handleLinkingCallback(Request $request): GoogleCallbackOutcome
    {
        $this->assertIntent($request, 'link');

        $user = $request->user();
        $linkUserId = $request->session()->get(self::LINK_USER_KEY);

        if (! $user instanceof User || (string) $user->getKey() !== (string) $linkUserId) {
            $this->clearFlow($request);

            throw new GoogleAuthenticationException('The Google linking session is no longer valid.');
        }

        $googleUser = $this->googleUser(route('api.v1.profile.google.callback'));
        [$googleId, $email] = $this->identity($googleUser);
        $owner = $this->users->findByGoogleId($googleId);

        if ($owner !== null && ! $owner->is($user)) {
            $this->clearFlow($request);

            throw new GoogleAuthenticationException('This Google account is already connected to another profile.');
        }

        if (mb_strtolower($user->email) !== $email) {
            $this->clearFlow($request);

            throw new GoogleAuthenticationException('Use the Google account with the same email address as your profile.');
        }

        $this->users->update($user, ['google_id' => $googleId]);
        $this->clearFlow($request);

        return GoogleCallbackOutcome::Linked;
    }

    private function googleUser(string $redirectUrl): SocialiteUser
    {
        try {
            return Socialite::driver('google')
                ->redirectUrl($redirectUrl)
                ->user();
        } catch (\Throwable $exception) {
            report($exception);

            throw new GoogleAuthenticationException(
                'Google authentication could not be completed. Please try again.',
                previous: $exception,
            );
        }
    }

    /**
     * @return array{string, string}
     */
    private function identity(SocialiteUser $googleUser): array
    {
        $googleId = trim((string) $googleUser->getId());
        $email = mb_strtolower(trim((string) $googleUser->getEmail()));

        if ($googleId === '' || $email === '') {
            throw new GoogleAuthenticationException(
                'Google did not provide the account identifier and email required to continue.'
            );
        }

        return [$googleId, $email];
    }

    private function assertIntent(Request $request, string $expected): void
    {
        if ($request->session()->get(self::INTENT_KEY) !== $expected) {
            $this->clearFlow($request);

            throw new GoogleAuthenticationException('The Google authentication session is no longer valid.');
        }
    }

    /**
     * @return array{google_id: string, email: string, name: string, role: ?string, expires_at: int}
     */
    private function validPendingRegistration(Request $request): array
    {
        $pending = $request->session()->get(self::PENDING_REGISTRATION_KEY);

        if (! is_array($pending)
            || ! isset($pending['google_id'], $pending['email'], $pending['name'], $pending['expires_at'])
            || (int) $pending['expires_at'] < now()->getTimestamp()) {
            $this->clearFlow($request);

            throw new GoogleAuthenticationException(
                'The pending Google registration has expired. Please start again.'
            );
        }

        return [
            'google_id' => (string) $pending['google_id'],
            'email' => (string) $pending['email'],
            'name' => (string) $pending['name'],
            'role' => isset($pending['role']) ? (string) $pending['role'] : null,
            'expires_at' => (int) $pending['expires_at'],
        ];
    }

    private function login(Request $request, User $user): void
    {
        Auth::guard('web')->login($user, true);
        $request->session()->regenerate();
    }

    private function clearFlow(Request $request): void
    {
        $request->session()->forget([
            self::INTENT_KEY,
            self::LINK_USER_KEY,
            self::PENDING_REGISTRATION_KEY,
            self::REGISTRATION_ROLE_KEY,
        ]);
    }
}
