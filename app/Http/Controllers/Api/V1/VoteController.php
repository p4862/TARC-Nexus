<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectEngagementResource;
use App\Models\Project;
use App\Models\Vote;
use App\Services\VoteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class VoteController extends Controller
{
    public function store(
        Request $request,
        Project $project,
        VoteService $votes,
    ): JsonResponse {
        Gate::authorize('create', [Vote::class, $project]);

        return (new ProjectEngagementResource(
            $votes->cast($request->user(), $project),
        ))->additional([
            'success' => true,
            'message' => 'People\'s Choice vote recorded successfully.',
        ])->response()->setStatusCode(201);
    }
}
