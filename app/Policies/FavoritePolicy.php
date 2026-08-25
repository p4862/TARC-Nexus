<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Project;
use App\Models\User;

class FavoritePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === UserRole::Guest;
    }

    public function manage(User $user, Project $project): bool
    {
        return $user->role === UserRole::Guest
            && $project->isPubliclyVisible();
    }
}
