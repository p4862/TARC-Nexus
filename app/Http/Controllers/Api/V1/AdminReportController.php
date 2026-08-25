<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminReportsResource;
use App\Models\User;
use App\Services\AdministrationService;
use Illuminate\Support\Facades\Gate;

class AdminReportController extends Controller
{
    public function __invoke(
        AdministrationService $administration,
    ): AdminReportsResource {
        Gate::authorize('viewAdministration', User::class);

        return (new AdminReportsResource(
            $administration->reports(),
        ))->additional([
            'success' => true,
            'message' => 'Administration reports retrieved successfully.',
        ]);
    }
}
