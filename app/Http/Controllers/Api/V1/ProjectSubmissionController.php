<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Support\Facades\Gate;

class ProjectSubmissionController extends Controller
{
    public function __invoke(
        Project $project,
        ProjectService $projects,
    ): ProjectResource {
        Gate::authorize('submit', $project);

        return (new ProjectResource($projects->submit($project)))->additional([
            'success' => true,
            'message' => 'Project submitted for review successfully.',
        ]);
    }
}
