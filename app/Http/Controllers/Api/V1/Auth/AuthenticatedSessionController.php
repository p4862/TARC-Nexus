<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthenticationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{
    public function show(Request $request): UserResource
    {
        return (new UserResource($request->user()))
            ->additional([
                'success' => true,
                'message' => 'Authenticated user retrieved successfully.',
            ]);
    }

    public function store(
        LoginRequest $request,
        AuthenticationService $authentication,
    ): UserResource {
        $user = $authentication->login($request->validated(), $request);

        return (new UserResource($user))
            ->additional([
                'success' => true,
                'message' => 'Signed in successfully.',
            ]);
    }

    public function destroy(
        Request $request,
        AuthenticationService $authentication,
    ): JsonResponse {
        $authentication->logout($request);

        return response()->json([
            'success' => true,
            'message' => 'Signed out successfully.',
            'data' => null,
        ]);
    }
}
