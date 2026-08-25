<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;

class UserPolicy
{
    public function viewAdministration(User $actor): bool
    {
        return $actor->role === UserRole::Administrator;
    }

    public function viewAny(User $actor): bool
    {
        return $this->viewAdministration($actor);
    }

    public function update(User $actor, User $profile): bool
    {
        return $actor->is($profile);
    }

    public function manageRole(User $actor, User $profile): bool
    {
        return $this->viewAdministration($actor) && ! $actor->is($profile);
    }

    public function delete(User $actor, User $profile): bool
    {
        return $this->viewAdministration($actor) && ! $actor->is($profile);
    }
}
