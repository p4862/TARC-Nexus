<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Engagement\ListCommentsRequest;
use App\Http\Resources\CommentResource;
use App\Models\Project;
use App\Services\CommentService;

class PublicCommentController extends Controller
{
    public function index(
        ListCommentsRequest $request,
        Project $project,
        CommentService $comments,
    ) {
        $discussion = $comments->discussion(
            $project,
            (int) ($request->validated('per_page') ?? 20),
        );

        return CommentResource::collection($discussion['comments'])
            ->additional([
                'success' => true,
                'message' => 'Project discussion retrieved successfully.',
                'comments_count' => $discussion['comments_count'],
            ]);
    }
}
