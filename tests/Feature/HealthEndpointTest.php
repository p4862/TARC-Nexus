<?php

namespace Tests\Feature;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class HealthEndpointTest extends TestCase
{
    public function test_health_endpoint_uses_the_standard_api_envelope(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Application is healthy.',
                'data' => [
                    'status' => 'ok',
                ],
            ]);
    }

    public function test_unknown_api_routes_return_a_safe_json_error(): void
    {
        $response = $this->getJson('/api/v1/not-a-real-route');

        $response
            ->assertNotFound()
            ->assertExactJson([
                'success' => false,
                'message' => 'The requested resource was not found.',
                'data' => null,
            ]);
    }

    public function test_common_api_exceptions_use_safe_http_statuses(): void
    {
        Route::get('/api/v1/test-authentication-error', static function (): void {
            throw new AuthenticationException;
        });
        Route::get('/api/v1/test-authorization-error', static function (): void {
            throw new AuthorizationException;
        });
        Route::get('/api/v1/test-model-error', static function (): void {
            throw new ModelNotFoundException;
        });

        $this->getJson('/api/v1/test-authentication-error')
            ->assertUnauthorized()
            ->assertJsonPath('success', false);
        $this->getJson('/api/v1/test-authorization-error')
            ->assertForbidden()
            ->assertJsonPath('success', false);
        $this->getJson('/api/v1/test-model-error')
            ->assertNotFound()
            ->assertJsonPath('success', false);
    }
}
