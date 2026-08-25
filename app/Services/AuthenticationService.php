<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AuthenticationService
{
    public function __construct(
        private readonly UserRepositoryInterface $users,
    ) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function register(array $attributes, Request $request): User
    {
        $this->ensureGuest();

        $user = DB::transaction(
            fn (): User => $this->users->create($attributes)
        );

        event(new Registered($user));

        Auth::guard('web')->login($user);
        $request->session()->regenerate();

        return $user;
    }

    /**
     * @param  array{email: string, password: string, remember?: bool}  $credentials
     */
    public function login(array $credentials, Request $request): User
    {
        $this->ensureGuest();

        $remember = (bool) ($credentials['remember'] ?? false);

        if (! Auth::guard('web')->attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], $remember)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $request->session()->regenerate();

        /** @var User $user */
        $user = Auth::guard('web')->user();

        return $user;
    }

    public function logout(Request $request): void
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        Auth::forgetGuards();
    }

    private function ensureGuest(): void
    {
        if (Auth::guard('web')->check()) {
            throw new AuthorizationException(
                'Sign out before authenticating another account.'
            );
        }
    }
}
