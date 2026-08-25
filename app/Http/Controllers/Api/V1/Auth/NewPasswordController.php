<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\PasswordResetService;
use Illuminate\Http\JsonResponse;

class NewPasswordController extends Controller
{
    public function __invoke(
        ResetPasswordRequest $request,
        PasswordResetService $passwords,
    ): JsonResponse {
        $passwords->reset($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Your password has been reset successfully.',
            'data' => null,
        ]);
    }
}
