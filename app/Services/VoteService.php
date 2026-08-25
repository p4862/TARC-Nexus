<?php

namespace App\Services;

use App\Exceptions\DuplicateVoteException;
use App\Models\Project;
use App\Models\User;
use App\Repositories\Contracts\EngagementRepositoryInterface;
use Illuminate\Support\Facades\DB;

class VoteService
{
    public function __construct(
        private readonly EngagementRepositoryInterface $engagement,
    ) {}

    public function cast(User $user, Project $project): Project
    {
        return DB::transaction(function () use ($user, $project): Project {
            $vote = $this->engagement->vote($user, $project);

            if (! $vote->wasRecentlyCreated) {
                throw new DuplicateVoteException(
                    'You have already voted for this project.',
                );
            }

            return $this->engagement->loadProjectState($project, $user);
        });
    }
}
