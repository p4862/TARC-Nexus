<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Project;
use App\Models\User;

class VotePolicy
{
    public function create(User $user, Project $project): bool
    {
        return $user->role === UserRole::Guest
            && $project->isPubliclyVisible();
    }
}
