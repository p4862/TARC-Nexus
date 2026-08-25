<?php

namespace Tests\Unit;

use App\Enums\UserRole;
use PHPUnit\Framework\TestCase;

class UserRoleTest extends TestCase
{
    public function test_role_values_match_the_database_contract(): void
    {
        $this->assertSame(
            ['Administrator', 'Exhibitor', 'Guest'],
            array_column(UserRole::cases(), 'value')
        );
    }
}
