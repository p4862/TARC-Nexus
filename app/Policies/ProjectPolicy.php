<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $actor): bool
    {
        return $actor->role === UserRole::Exhibitor;
    }

    public function view(User $actor, Project $project): bool
    {
        return $actor->role === UserRole::Exhibitor
            && $project->user_id === $actor->getKey();
    }

    public function create(User $actor): bool
    {
        return $actor->role === UserRole::Exhibitor;
    }

    public function update(User $actor, Project $project): bool
    {
        return $this->view($actor, $project);
    }

    public function delete(User $actor, Project $project): bool
    {
        return $this->view($actor, $project);
    }

    public function submit(User $actor, Project $project): bool
    {
        return $this->view($actor, $project);
    }

    public function manageMedia(User $actor, Project $project): bool
    {
        return $this->view($actor, $project);
    }

    public function reviewAny(User $actor): bool
    {
        return $actor->role === UserRole::Administrator;
    }

    public function review(User $actor, Project $project): bool
    {
        return $this->reviewAny($actor);
    }

    public function publish(User $actor, Project $project): bool
    {
        return $this->review($actor, $project);
    }

    public function feature(User $actor, Project $project): bool
    {
        return $this->review($actor, $project);
    }

    public function viewAnalytics(User $actor, Project $project): bool
    {
        return $actor->role === UserRole::Exhibitor
            && $project->user_id === $actor->getKey();
    }
}
