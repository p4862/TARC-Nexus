<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Sdg;
use App\Models\User;

class SdgPolicy
{
    public function create(User $actor): bool
    {
        return $actor->role === UserRole::Administrator;
    }

    public function update(User $actor, Sdg $sdg): bool
    {
        return $this->create($actor);
    }

    public function delete(User $actor, Sdg $sdg): bool
    {
        return $this->create($actor);
    }
}
