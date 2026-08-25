<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\StoreAvatarRequest;
use App\Http\Resources\UserResource;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProfileAvatarController extends Controller
{
    public function store(
        StoreAvatarRequest $request,
        ProfileService $profiles,
    ): UserResource {
        Gate::authorize('update', $request->user());

        $user = $profiles->updateAvatar(
            $request->user(),
            $request->file('avatar'),
        );

        return (new UserResource($user))
            ->additional([
                'success' => true,
                'message' => 'Profile picture updated successfully.',
            ]);
    }

    public function destroy(
        Request $request,
        ProfileService $profiles,
    ): UserResource {
        Gate::authorize('update', $request->user());

        $user = $profiles->removeAvatar($request->user());

        return (new UserResource($user))
            ->additional([
                'success' => true,
                'message' => 'Profile picture removed successfully.',
            ]);
    }
}
