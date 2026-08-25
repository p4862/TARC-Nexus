<?php

namespace Tests\Feature;

use Tests\TestCase;

class SpaShellTest extends TestCase
{
    public function test_homepage_serves_the_react_shell(): void
    {
        $this->withoutVite();

        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertViewIs('app')
            ->assertSee('id="root"', false);
    }

    public function test_frontend_routes_are_handled_by_the_react_shell(): void
    {
        $this->withoutVite();

        foreach ([
            '/projects/example-project',
            '/exhibitor/analytics',
            '/administrator',
            '/administrator/projects/1',
            '/administrator/users',
            '/administrator/taxonomies',
            '/administrator/announcements',
            '/administrator/reports',
        ] as $path) {
            $this->get($path)
                ->assertOk()
                ->assertViewIs('app');
        }
    }

    public function test_authentication_routes_serve_the_react_shell(): void
    {
        $this->withoutVite();

        foreach ([
            '/login',
            '/register',
            '/forgot-password',
            '/reset-password/example-token?email=guest@example.com',
            '/register/google',
            '/profile',
        ] as $path) {
            $this->get($path)
                ->assertOk()
                ->assertViewIs('app');
        }
    }
}
