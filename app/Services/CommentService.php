<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Project;
use App\Models\User;
use App\Repositories\Contracts\EngagementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class CommentService
{
    public function __construct(
        private readonly EngagementRepositoryInterface $engagement,
    ) {}

    /**
     * @return array{
     *     comments: LengthAwarePaginator<int, Comment>,
     *     comments_count: int
     * }
     */
    public function discussion(Project $project, int $perPage): array
    {
        $this->ensurePublished($project);

        return [
            'comments' => $this->engagement
                ->paginateComments($project, $perPage),
            'comments_count' => $this->engagement
                ->commentsCount($project),
        ];
    }

    /**
     * @param  array{comment: string, parent_id?: int|null}  $attributes
     */
    public function create(
        User $author,
        Project $project,
        array $attributes,
    ): Comment {
        return DB::transaction(
            fn (): Comment => $this->engagement
                ->createComment($author, $project, $attributes),
        );
    }

    public function delete(Comment $comment): void
    {
        DB::transaction(
            fn () => $this->engagement->deleteComment($comment),
        );
    }

    private function ensurePublished(Project $project): void
    {
        if (! $project->isPubliclyVisible()) {
            throw (new ModelNotFoundException)->setModel(
                Project::class,
                [$project->getKey()],
            );
        }
    }
}
