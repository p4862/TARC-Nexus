<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Comment;
use App\Models\Project;
use App\Models\User;

class CommentPolicy
{
    public function create(User $user, Project $project): bool
    {
        if (! $project->isPubliclyVisible()) {
            return false;
        }

        return $user->role === UserRole::Guest
            || ($user->role === UserRole::Exhibitor
                && $project->user_id === $user->getKey());
    }

    public function delete(User $user, Comment $comment): bool
    {
        return $user->role === UserRole::Administrator;
    }
}
