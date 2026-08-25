<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administration\ListAnalyticsRequest;
use App\Http\Resources\ExhibitorAnalyticsResource;
use App\Models\Project;
use App\Services\AdministrationService;
use Illuminate\Support\Facades\Gate;

class ExhibitorAnalyticsController extends Controller
{
    public function __invoke(
        ListAnalyticsRequest $request,
        AdministrationService $administration,
    ): ExhibitorAnalyticsResource {
        Gate::authorize('viewAny', Project::class);

        return (new ExhibitorAnalyticsResource(
            $administration->exhibitorAnalytics(
                $request->user(),
                (int) ($request->validated('per_page') ?? 15),
            ),
        ))->additional([
            'success' => true,
            'message' => 'Exhibitor analytics retrieved successfully.',
        ]);
    }
}
