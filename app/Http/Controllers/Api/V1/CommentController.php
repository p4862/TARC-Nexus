<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Engagement\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Project;
use App\Services\CommentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    public function store(
        StoreCommentRequest $request,
        Project $project,
        CommentService $comments,
    ): CommentResource {
        Gate::authorize('create', [Comment::class, $project]);

        return (new CommentResource(
            $comments->create(
                $request->user(),
                $project,
                $request->validated(),
            ),
        ))->additional([
            'success' => true,
            'message' => 'Comment posted successfully.',
        ]);
    }

    public function destroy(
        Comment $comment,
        CommentService $comments,
    ): JsonResponse {
        Gate::authorize('delete', $comment);
        $comments->delete($comment);

        return response()->json([
            'success' => true,
            'message' => 'Comment thread removed successfully.',
            'data' => null,
        ]);
    }
}
