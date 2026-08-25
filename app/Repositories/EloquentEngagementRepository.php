<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Project;
use App\Models\User;
use App\Models\Vote;
use App\Repositories\Contracts\EngagementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentEngagementRepository implements EngagementRepositoryInterface
{
    public function favorite(User $user, Project $project): Favorite
    {
        return Favorite::query()->firstOrCreate([
            'user_id' => $user->getKey(),
            'project_id' => $project->getKey(),
        ]);
    }

    public function removeFavorite(User $user, Project $project): bool
    {
        return Favorite::query()
            ->whereBelongsTo($user)
            ->whereBelongsTo($project)
            ->delete() > 0;
    }

    public function vote(User $user, Project $project): Vote
    {
        return Vote::query()->firstOrCreate([
            'user_id' => $user->getKey(),
            'project_id' => $project->getKey(),
        ]);
    }

    public function paginateComments(
        Project $project,
        int $perPage,
    ): LengthAwarePaginator {
        return Comment::query()
            ->whereBelongsTo($project)
            ->whereNull('parent_id')
            ->with([
                'author:id,name,avatar,role',
                'replies',
            ])
            ->oldest('created_at')
            ->oldest('id')
            ->paginate($perPage);
    }

    public function commentsCount(Project $project): int
    {
        return Comment::query()
            ->whereBelongsTo($project)
            ->count();
    }

    public function createComment(
        User $author,
        Project $project,
        array $attributes,
    ): Comment {
        return Comment::query()->create([
            ...$attributes,
            'user_id' => $author->getKey(),
            'project_id' => $project->getKey(),
        ])->load('author:id,name,avatar,role');
    }

    public function deleteComment(Comment $comment): void
    {
        $comment->delete();
    }

    public function loadProjectState(Project $project, User $viewer): Project
    {
        $project->loadCount([
            'favorites',
            'votes',
            'comments',
        ]);
        $project->setAttribute(
            'is_favorited',
            $project->favorites()
                ->where('user_id', $viewer->getKey())
                ->exists(),
        );
        $project->setAttribute(
            'has_voted',
            $project->votes()
                ->where('user_id', $viewer->getKey())
                ->exists(),
        );

        return $project;
    }
}
