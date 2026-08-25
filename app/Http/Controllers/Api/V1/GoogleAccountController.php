<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\GoogleAuthenticationException;
use App\Http\Controllers\Controller;
use App\Services\GoogleAuthenticationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GoogleAccountController extends Controller
{
    public function redirect(
        Request $request,
        GoogleAuthenticationService $google,
    ): RedirectResponse {
        return $google->redirectForLinking($request);
    }

    public function callback(
        Request $request,
        GoogleAuthenticationService $google,
    ): RedirectResponse {
        try {
            $google->handleLinkingCallback($request);
        } catch (GoogleAuthenticationException $exception) {
            return redirect()->to('/profile?'.http_build_query([
                'google_error' => $exception->getMessage(),
            ]));
        }

        return redirect('/profile?google=linked');
    }
}
