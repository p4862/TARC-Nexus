<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Engagement\ListFavoritesRequest;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\ProjectEngagementResource;
use App\Models\Favorite;
use App\Models\Project;
use App\Repositories\Contracts\ProjectRepositoryInterface;
use App\Services\FavoriteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class FavoriteController extends Controller
{
    public function index(
        ListFavoritesRequest $request,
        ProjectRepositoryInterface $projects,
    ) {
        Gate::authorize('viewAny', Favorite::class);

        return ProjectCardResource::collection(
            $projects->paginateFavoritedBy(
                $request->user(),
                (int) ($request->validated('per_page') ?? 12),
            ),
        )->additional([
            'success' => true,
            'message' => 'Favorite projects retrieved successfully.',
        ]);
    }

    public function store(
        Request $request,
        Project $project,
        FavoriteService $favorites,
    ): JsonResponse {
        Gate::authorize('manage', [Favorite::class, $project]);

        $result = $favorites->add($request->user(), $project);

        return (new ProjectEngagementResource($result['project']))
            ->additional([
                'success' => true,
                'message' => $result['created']
                    ? 'Project added to favorites successfully.'
                    : 'Project is already in your favorites.',
            ])
            ->response()
            ->setStatusCode($result['created'] ? 201 : 200);
    }

    public function destroy(
        Request $request,
        Project $project,
        FavoriteService $favorites,
    ): ProjectEngagementResource {
        Gate::authorize('manage', [Favorite::class, $project]);

        return (new ProjectEngagementResource(
            $favorites->remove($request->user(), $project),
        ))->additional([
            'success' => true,
            'message' => 'Project removed from favorites successfully.',
        ]);
    }
}
