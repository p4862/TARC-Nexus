<?php

namespace App\Repositories\Contracts;

use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Project;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface EngagementRepositoryInterface
{
    public function favorite(User $user, Project $project): Favorite;

    public function removeFavorite(User $user, Project $project): bool;

    public function vote(User $user, Project $project): Vote;

    /**
     * @return LengthAwarePaginator<int, Comment>
     */
    public function paginateComments(
        Project $project,
        int $perPage,
    ): LengthAwarePaginator;

    public function commentsCount(Project $project): int;

    /**
     * @param  array{comment: string, parent_id?: int|null}  $attributes
     */
    public function createComment(
        User $author,
        Project $project,
        array $attributes,
    ): Comment;

    public function deleteComment(Comment $comment): void;

    public function loadProjectState(Project $project, User $viewer): Project;
}
