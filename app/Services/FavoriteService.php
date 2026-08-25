<?php

namespace App\Services;

use App\Models\Project;
use App\Models\User;
use App\Repositories\Contracts\EngagementRepositoryInterface;
use Illuminate\Support\Facades\DB;

class FavoriteService
{
    public function __construct(
        private readonly EngagementRepositoryInterface $engagement,
    ) {}

    /**
     * @return array{project: Project, created: bool}
     */
    public function add(User $user, Project $project): array
    {
        return DB::transaction(function () use ($user, $project): array {
            $favorite = $this->engagement->favorite($user, $project);

            return [
                'project' => $this->engagement
                    ->loadProjectState($project, $user),
                'created' => $favorite->wasRecentlyCreated,
            ];
        });
    }

    public function remove(User $user, Project $project): Project
    {
        return DB::transaction(function () use ($user, $project): Project {
            $this->engagement->removeFavorite($user, $project);

            return $this->engagement->loadProjectState($project, $user);
        });
    }
}
