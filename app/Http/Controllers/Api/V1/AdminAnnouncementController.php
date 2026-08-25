<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administration\ListAnnouncementsRequest;
use App\Http\Requests\Administration\StoreAnnouncementRequest;
use App\Http\Requests\Administration\UpdateAnnouncementRequest;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use App\Services\AnnouncementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class AdminAnnouncementController extends Controller
{
    public function index(
        ListAnnouncementsRequest $request,
        AnnouncementService $announcements,
    ) {
        Gate::authorize('viewAny', Announcement::class);

        return AnnouncementResource::collection(
            $announcements->index(
                (int) ($request->validated('per_page') ?? 15),
            ),
        )->additional([
            'success' => true,
            'message' => 'Announcements retrieved successfully.',
        ]);
    }

    public function store(
        StoreAnnouncementRequest $request,
        AnnouncementService $announcements,
    ): AnnouncementResource {
        Gate::authorize('create', Announcement::class);

        $announcement = $announcements->create(
            $request->user(),
            $request->validated(),
        );

        return (new AnnouncementResource($announcement))->additional([
            'success' => true,
            'message' => 'Announcement created successfully.',
        ]);
    }

    public function update(
        UpdateAnnouncementRequest $request,
        Announcement $announcement,
        AnnouncementService $announcements,
    ): AnnouncementResource {
        Gate::authorize('update', $announcement);

        $announcement = $announcements->update(
            $announcement,
            $request->validated(),
        );

        return (new AnnouncementResource($announcement))->additional([
            'success' => true,
            'message' => 'Announcement updated successfully.',
        ]);
    }

    public function destroy(
        Announcement $announcement,
        AnnouncementService $announcements,
    ): JsonResponse {
        Gate::authorize('delete', $announcement);
        $announcements->delete($announcement);

        return response()->json([
            'success' => true,
            'message' => 'Announcement deleted successfully.',
            'data' => null,
        ]);
    }
}
