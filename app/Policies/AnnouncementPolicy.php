<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Announcement;
use App\Models\User;

class AnnouncementPolicy
{
    public function viewAny(User $actor): bool
    {
        return $actor->role === UserRole::Administrator;
    }

    public function view(User $actor, Announcement $announcement): bool
    {
        return $this->viewAny($actor);
    }

    public function create(User $actor): bool
    {
        return $this->viewAny($actor);
    }

    public function update(User $actor, Announcement $announcement): bool
    {
        return $this->viewAny($actor);
    }

    public function delete(User $actor, Announcement $announcement): bool
    {
        return $this->viewAny($actor);
    }
}
