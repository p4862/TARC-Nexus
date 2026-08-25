<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProfileController extends Controller
{
    public function show(Request $request): UserResource
    {
        return (new UserResource($request->user()))
            ->additional([
                'success' => true,
                'message' => 'Profile retrieved successfully.',
            ]);
    }

    public function update(
        UpdateProfileRequest $request,
        ProfileService $profiles,
    ): UserResource {
        Gate::authorize('update', $request->user());

        $user = $profiles->update($request->user(), $request->validated());

        return (new UserResource($user))
            ->additional([
                'success' => true,
                'message' => 'Profile updated successfully.',
            ]);
    }
}
