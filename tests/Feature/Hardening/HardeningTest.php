<?php

namespace Tests\Feature\Hardening;

use App\Enums\ProjectStatus;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class HardeningTest extends TestCase
{
    use RefreshDatabase;

    public function test_responses_include_defensive_browser_headers(): void
    {
        $this->getJson('/api/v1/health')
            ->assertOk()
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'DENY')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
            ->assertHeader(
                'Permissions-Policy',
                'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
            )
            ->assertHeader('X-Permitted-Cross-Domain-Policies', 'none');
    }

    public function test_production_security_policy_and_hsts_are_applied_to_https(): void
    {
        config()->set('security.content_security_policy.enabled', true);
        config()->set('security.hsts.enabled', true);

        $response = $this
            ->getJson('https://localhost/api/v1/health')
            ->assertOk()
            ->assertHeader(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains',
            );

        $policy = (string) $response->headers->get(
            'Content-Security-Policy',
        );

        $this->assertStringContainsString("default-src 'self'", $policy);
        $this->assertMatchesRegularExpression(
            "/script-src 'self' 'nonce-[A-Za-z0-9]{40}'/",
            $policy,
        );
        $this->assertStringContainsString('upgrade-insecure-requests', $policy);
    }

    public function test_private_api_responses_cannot_be_cached(): void
    {
        $this->getJson('/api/v1/profile')
            ->assertUnauthorized()
            ->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_sensitive_mutations_have_endpoint_rate_limits(): void
    {
        foreach ([
            'api.v1.profile.avatar.store' => 'throttle:10,1',
            'api.v1.exhibitor.projects.store' => 'throttle:10,1',
            'api.v1.exhibitor.projects.media.store' => 'throttle:10,1',
            'api.v1.administrator.categories.store' => 'throttle:30,1',
            'api.v1.administrator.announcements.store' => 'throttle:30,1',
        ] as $routeName => $middleware) {
            $route = Route::getRoutes()->getByName($routeName);

            $this->assertNotNull($route, "Route [{$routeName}] is missing.");
            $this->assertContains($middleware, $route->gatherMiddleware());
        }
    }

    public function test_eloquent_is_strict_outside_production(): void
    {
        $this->assertTrue(Model::preventsLazyLoading());
        $this->assertTrue(Model::preventsSilentlyDiscardingAttributes());
        $this->assertTrue(Model::preventsAccessingMissingAttributes());
    }

    public function test_gallery_query_count_remains_bounded_as_results_grow(): void
    {
        Project::factory()->count(12)->create([
            'status' => ProjectStatus::Published,
            'published_at' => now()->subMinute(),
        ]);

        DB::flushQueryLog();
        DB::enableQueryLog();

        $this->getJson('/api/v1/public/projects?per_page=12')
            ->assertOk()
            ->assertJsonCount(12, 'data');

        $queryCount = count(DB::getQueryLog());
        DB::disableQueryLog();

        $this->assertLessThanOrEqual(
            8,
            $queryCount,
            "Gallery executed {$queryCount} queries for one page.",
        );
    }
}
