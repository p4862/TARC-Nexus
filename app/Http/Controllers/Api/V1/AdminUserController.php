<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administration\ListUsersRequest;
use App\Http\Requests\Administration\UpdateUserRoleRequest;
use App\Http\Resources\AdminUserResource;
use App\Models\User;
use App\Services\AdministrationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class AdminUserController extends Controller
{
    public function index(
        ListUsersRequest $request,
        AdministrationService $administration,
    ) {
        Gate::authorize('viewAny', User::class);

        return AdminUserResource::collection(
            $administration->users($request->validated()),
        )->additional([
            'success' => true,
            'message' => 'Users retrieved successfully.',
        ]);
    }

    public function updateRole(
        UpdateUserRoleRequest $request,
        User $user,
        AdministrationService $administration,
    ): AdminUserResource {
        Gate::authorize('manageRole', $user);

        $user = $administration->updateUserRole(
            $user,
            UserRole::from($request->validated('role')),
        );

        return (new AdminUserResource($user))->additional([
            'success' => true,
            'message' => 'User role updated successfully.',
        ]);
    }

    public function destroy(
        User $user,
        AdministrationService $administration,
    ): JsonResponse {
        Gate::authorize('delete', $user);
        $administration->deleteUser($user);

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
            'data' => null,
        ]);
    }
}
