<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Technology;
use App\Models\User;

class TechnologyPolicy
{
    public function create(User $actor): bool
    {
        return $actor->role === UserRole::Administrator;
    }

    public function update(User $actor, Technology $technology): bool
    {
        return $this->create($actor);
    }

    public function delete(User $actor, Technology $technology): bool
    {
        return $this->create($actor);
    }
}
