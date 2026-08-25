<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminDashboardResource;
use App\Models\User;
use App\Services\AdministrationService;
use Illuminate\Support\Facades\Gate;

class AdminDashboardController extends Controller
{
    public function __invoke(
        AdministrationService $administration,
    ): AdminDashboardResource {
        Gate::authorize('viewAdministration', User::class);

        return (new AdminDashboardResource(
            $administration->dashboard(),
        ))->additional([
            'success' => true,
            'message' => 'Administrator dashboard retrieved successfully.',
        ]);
    }
}
