<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Services\PasswordResetService;
use Illuminate\Http\JsonResponse;

class PasswordResetLinkController extends Controller
{
    public function __invoke(
        ForgotPasswordRequest $request,
        PasswordResetService $passwords,
    ): JsonResponse {
        $passwords->sendResetLink($request->validated('email'));

        return response()->json([
            'success' => true,
            'message' => 'If an account exists for that email, a password reset link has been sent.',
            'data' => null,
        ], 202);
    }
}
