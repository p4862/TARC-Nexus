<?php

use App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController;
use App\Http\Controllers\Api\V1\GoogleAccountController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->name('api.v1.')->group(function (): void {
    Route::get('/auth/google/redirect', [GoogleAuthenticationController::class, 'redirect'])
        ->middleware('throttle:12,1')
        ->name('auth.google.redirect');
    Route::get('/auth/google/callback', [GoogleAuthenticationController::class, 'callback'])
        ->middleware('throttle:12,1')
        ->name('auth.google.callback');

    Route::get('/profile/google/redirect', [GoogleAccountController::class, 'redirect'])
        ->middleware(['auth', 'throttle:12,1'])
        ->name('profile.google.redirect');
    Route::get('/profile/google/callback', [GoogleAccountController::class, 'callback'])
        ->middleware(['auth', 'throttle:12,1'])
        ->name('profile.google.callback');

});

Route::get('/api/v1/auth/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::view('/login', 'app')->name('login');
Route::view('/email/verify', 'app')
    ->middleware('auth')
    ->name('verification.notice');
Route::view('/reset-password/{token}', 'app')
    ->name('password.reset');

Route::view('/{path?}', 'app')
    ->where('path', '^(?!api(?:/|$)|sanctum(?:/|$)).*')
    ->name('spa');
