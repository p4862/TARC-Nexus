<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\MediaType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use App\Models\Project;
use App\Services\ProjectMediaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class ProjectMediaController extends Controller
{
    public function store(
        StoreProjectMediaRequest $request,
        Project $project,
        ProjectMediaService $media,
    ): MediaResource {
        Gate::authorize('manageMedia', $project);

        $asset = $media->store(
            $project,
            MediaType::from($request->validated('type')),
            $request->file('file'),
        );

        return (new MediaResource($asset))->additional([
            'success' => true,
            'message' => 'Project media uploaded successfully.',
        ]);
    }

    public function destroy(
        Project $project,
        Media $media,
        ProjectMediaService $projectMedia,
    ): JsonResponse {
        Gate::authorize('manageMedia', $project);
        $projectMedia->delete($project, $media);

        return response()->json([
            'success' => true,
            'message' => 'Project media removed successfully.',
            'data' => null,
        ]);
    }
}
