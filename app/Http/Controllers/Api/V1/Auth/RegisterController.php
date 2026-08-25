<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthenticationService;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    public function __invoke(
        RegisterRequest $request,
        AuthenticationService $authentication,
    ): JsonResponse {
        $user = $authentication->register($request->validated(), $request);

        return (new UserResource($user))
            ->additional([
                'success' => true,
                'message' => 'Account created successfully. Please verify your email address.',
            ])
            ->response()
            ->setStatusCode(201);
    }
}
