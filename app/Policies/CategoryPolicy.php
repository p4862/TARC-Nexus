<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    public function create(User $actor): bool
    {
        return $actor->role === UserRole::Administrator;
    }

    public function update(User $actor, Category $category): bool
    {
        return $this->create($actor);
    }

    public function delete(User $actor, Category $category): bool
    {
        return $this->create($actor);
    }
}
