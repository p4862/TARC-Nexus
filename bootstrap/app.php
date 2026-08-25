<?php

use App\Exceptions\AdministrationConflictException;
use App\Exceptions\DuplicateVoteException;
use App\Exceptions\GoogleAuthenticationException;
use App\Exceptions\ProjectStateException;
use App\Http\Middleware\AddSecurityHeaders;
use App\Http\Middleware\EnsureUserHasRole;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(AddSecurityHeaders::class);
        $middleware->statefulApi();
        $middleware->alias([
            'role' => EnsureUserHasRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $isApiRequest = static fn (Request $request): bool => $request->is('api/*');

        $exceptions->shouldRenderJsonWhen(
            static fn (Request $request, Throwable $exception): bool => $isApiRequest($request)
                || $request->expectsJson()
        );

        $exceptions->render(
            static function (ValidationException $exception, Request $request) use ($isApiRequest): ?JsonResponse {
                if (! $isApiRequest($request)) {
                    return null;
                }

                return response()->json([
                    'success' => false,
                    'message' => 'The given data was invalid.',
                    'errors' => $exception->errors(),
                ], $exception->status);
            }
        );

        $exceptions->render(
            static function (Throwable $exception, Request $request) use ($isApiRequest): ?JsonResponse {
                if (! $isApiRequest($request)) {
                    return null;
                }

                $status = match (true) {
                    $exception instanceof AuthenticationException => 401,
                    $exception instanceof AuthorizationException => 403,
                    $exception instanceof AdministrationConflictException => 409,
                    $exception instanceof GoogleAuthenticationException => 409,
                    $exception instanceof DuplicateVoteException => 409,
                    $exception instanceof ProjectStateException => 409,
                    $exception instanceof ModelNotFoundException => 404,
                    $exception instanceof HttpExceptionInterface => $exception->getStatusCode(),
                    default => 500,
                };

                $message = match ($status) {
                    401 => 'Unauthenticated.',
                    403 => 'This action is unauthorized.',
                    404 => 'The requested resource was not found.',
                    405 => 'The requested method is not allowed.',
                    409 => $exception->getMessage(),
                    422 => 'The given data was invalid.',
                    default => $status >= 500
                        ? 'An unexpected server error occurred.'
                        : 'The request could not be completed.',
                };

                return response()->json([
                    'success' => false,
                    'message' => $message,
                    'data' => null,
                ], $status);
            }
        );
    })->create();
