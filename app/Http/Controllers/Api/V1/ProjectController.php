<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\ListProjectsRequest;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Repositories\Contracts\ProjectRepositoryInterface;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class ProjectController extends Controller
{
    public function index(
        ListProjectsRequest $request,
        ProjectRepositoryInterface $projects,
    ) {
        Gate::authorize('viewAny', Project::class);

        $paginator = $projects->paginateOwnedBy(
            $request->user(),
            (int) ($request->validated('per_page') ?? 12),
            $request->validated('status'),
        );

        return ProjectResource::collection($paginator)->additional([
            'success' => true,
            'message' => 'Projects retrieved successfully.',
        ]);
    }

    public function store(
        StoreProjectRequest $request,
        ProjectService $projects,
    ): ProjectResource {
        Gate::authorize('create', Project::class);

        $project = $projects->createDraft(
            $request->user(),
            $request->validated(),
        );

        return (new ProjectResource($project))->additional([
            'success' => true,
            'message' => 'Project draft created successfully.',
        ]);
    }

    public function show(
        Project $project,
        ProjectService $projects,
    ): ProjectResource {
        Gate::authorize('view', $project);

        return (new ProjectResource($projects->details($project)))->additional([
            'success' => true,
            'message' => 'Project retrieved successfully.',
        ]);
    }

    public function update(
        UpdateProjectRequest $request,
        Project $project,
        ProjectService $projects,
    ): ProjectResource {
        Gate::authorize('update', $project);

        $project = $projects->updateDraft($project, $request->validated());

        return (new ProjectResource($project))->additional([
            'success' => true,
            'message' => 'Project draft updated successfully.',
        ]);
    }

    public function destroy(
        Project $project,
        ProjectService $projects,
    ): JsonResponse {
        Gate::authorize('delete', $project);
        $projects->deleteDraft($project);

        return response()->json([
            'success' => true,
            'message' => 'Project draft deleted successfully.',
            'data' => null,
        ]);
    }
}
