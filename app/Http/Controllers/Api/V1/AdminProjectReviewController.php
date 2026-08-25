<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administration\FeatureProjectRequest;
use App\Http\Requests\Administration\ListReviewProjectsRequest;
use App\Http\Requests\Administration\PublishProjectRequest;
use App\Http\Requests\Administration\ReviewProjectRequest;
use App\Http\Resources\AdminProjectResource;
use App\Models\Project;
use App\Services\AdministrationService;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;

class AdminProjectReviewController extends Controller
{
    public function index(
        ListReviewProjectsRequest $request,
        AdministrationService $administration,
    ) {
        Gate::authorize('reviewAny', Project::class);

        return AdminProjectResource::collection(
            $administration->reviewProjects($request->validated()),
        )->additional([
            'success' => true,
            'message' => 'Project review queue retrieved successfully.',
        ]);
    }

    public function show(
        Project $project,
        AdministrationService $administration,
    ): AdminProjectResource {
        Gate::authorize('review', $project);

        return (new AdminProjectResource(
            $administration->reviewProject($project),
        ))->additional([
            'success' => true,
            'message' => 'Project submission retrieved successfully.',
        ]);
    }

    public function start(
        ReviewProjectRequest $request,
        Project $project,
        AdministrationService $administration,
    ): AdminProjectResource {
        Gate::authorize('review', $project);

        $project = $administration->startReview(
            $project,
            $request->user(),
            $request->validated('review_notes'),
        );

        return (new AdminProjectResource($project))->additional([
            'success' => true,
            'message' => 'Project review started successfully.',
        ]);
    }

    public function approve(
        ReviewProjectRequest $request,
        Project $project,
        AdministrationService $administration,
    ): AdminProjectResource {
        Gate::authorize('review', $project);

        $project = $administration->approve(
            $project,
            $request->user(),
            $request->validated('review_notes'),
        );

        return (new AdminProjectResource($project))->additional([
            'success' => true,
            'message' => 'Project approved successfully.',
        ]);
    }

    public function publish(
        PublishProjectRequest $request,
        Project $project,
        AdministrationService $administration,
    ): AdminProjectResource {
        Gate::authorize('publish', $project);
        $publishedAt = $request->validated('published_at');

        $project = $administration->publish(
            $project,
            $request->user(),
            $publishedAt === null ? null : Carbon::parse($publishedAt),
        );

        return (new AdminProjectResource($project))->additional([
            'success' => true,
            'message' => 'Project publication scheduled successfully.',
        ]);
    }

    public function feature(
        FeatureProjectRequest $request,
        Project $project,
        AdministrationService $administration,
    ): AdminProjectResource {
        Gate::authorize('feature', $project);

        $project = $administration->setFeatured(
            $project,
            (bool) $request->validated('featured'),
        );

        return (new AdminProjectResource($project))->additional([
            'success' => true,
            'message' => 'Featured selection updated successfully.',
        ]);
    }
}
