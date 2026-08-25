<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function create(array $attributes): User
    {
        return User::query()->create($attributes);
    }

    public function findByEmail(string $email): ?User
    {
        return User::query()
            ->where('email', mb_strtolower($email))
            ->first();
    }

    public function findByGoogleId(string $googleId): ?User
    {
        return User::query()
            ->where('google_id', $googleId)
            ->first();
    }

    public function update(User $user, array $attributes): User
    {
        $user->fill($attributes);
        $user->save();

        return $user->refresh();
    }
}
