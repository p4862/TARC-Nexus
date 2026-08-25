<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\ListPublishedProjectsRequest;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\PublicProjectResource;
use App\Models\Project;
use App\Services\PublicExhibitionService;
use Illuminate\Http\Request;

class PublicProjectController extends Controller
{
    public function index(
        ListPublishedProjectsRequest $request,
        PublicExhibitionService $exhibition,
    ) {
        return ProjectCardResource::collection(
            $exhibition->gallery($request->validated(), $request->user()),
        )->additional([
            'success' => true,
            'message' => 'Published projects retrieved successfully.',
        ]);
    }

    public function show(
        Project $project,
        PublicExhibitionService $exhibition,
        Request $request,
    ): PublicProjectResource {
        return (new PublicProjectResource(
            $exhibition->project($project, $request->user()),
        ))->additional([
            'success' => true,
            'message' => 'Published project retrieved successfully.',
        ]);
    }
}
