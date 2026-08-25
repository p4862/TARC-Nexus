<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Enums\GoogleCallbackOutcome;
use App\Exceptions\GoogleAuthenticationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CompleteGoogleRegistrationRequest;
use App\Http\Requests\Auth\GoogleRedirectRequest;
use App\Http\Resources\UserResource;
use App\Services\GoogleAuthenticationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GoogleAuthenticationController extends Controller
{
    public function redirect(
        GoogleRedirectRequest $request,
        GoogleAuthenticationService $google,
    ): RedirectResponse {
        if ($request->user() !== null) {
            return redirect('/profile');
        }

        return $google->redirectForAuthentication(
            $request,
            $request->validated('role'),
        );
    }

    public function callback(
        Request $request,
        GoogleAuthenticationService $google,
    ): RedirectResponse {
        try {
            $outcome = $google->handleAuthenticationCallback($request);
        } catch (GoogleAuthenticationException $exception) {
            return redirect()->to('/login?'.http_build_query([
                'oauth_error' => $exception->getMessage(),
            ]));
        }

        return match ($outcome) {
            GoogleCallbackOutcome::Authenticated => redirect('/profile?google=authenticated'),
            GoogleCallbackOutcome::RegistrationRequired => redirect('/register/google'),
            default => redirect('/login'),
        };
    }

    public function pending(
        Request $request,
        GoogleAuthenticationService $google,
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => 'Pending Google registration retrieved successfully.',
            'data' => $google->pendingRegistration($request),
        ]);
    }

    public function complete(
        CompleteGoogleRegistrationRequest $request,
        GoogleAuthenticationService $google,
    ): JsonResponse {
        $user = $google->completeRegistration($request->validated(), $request);

        return (new UserResource($user))
            ->additional([
                'success' => true,
                'message' => 'Google account registration completed successfully.',
            ])
            ->response()
            ->setStatusCode(201);
    }
}
