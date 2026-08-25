<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class UserFoundationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_table_contains_the_documented_authentication_fields(): void
    {
        $this->assertTrue(Schema::hasColumns('users', [
            'name',
            'email',
            'password',
            'google_id',
            'avatar',
            'biography',
            'institution',
            'role',
            'email_verified_at',
            'remember_token',
        ]));
    }

    public function test_user_factory_builds_a_guest_with_an_enum_role(): void
    {
        $user = User::factory()->create();

        $this->assertSame(UserRole::Guest, $user->role);
        $this->assertNotEmpty($user->institution);
    }
}
