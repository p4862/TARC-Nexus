<?php

namespace Tests\Unit;

use App\Enums\UserRole;
use App\Http\Middleware\EnsureUserHasRole;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRoleTest extends TestCase
{
    public function test_request_continues_when_user_has_an_allowed_role(): void
    {
        $request = Request::create('/protected');
        $request->setUserResolver(
            fn (): User => new User(['role' => UserRole::Exhibitor])
        );

        $response = (new EnsureUserHasRole)->handle(
            $request,
            fn (): Response => new Response('allowed'),
            UserRole::Administrator->value,
            UserRole::Exhibitor->value,
        );

        $this->assertSame('allowed', $response->getContent());
    }

    public function test_request_is_rejected_when_user_lacks_an_allowed_role(): void
    {
        $request = Request::create('/protected');
        $request->setUserResolver(
            fn (): User => new User(['role' => UserRole::Guest])
        );

        $this->expectException(AuthorizationException::class);

        (new EnsureUserHasRole)->handle(
            $request,
            fn (): Response => new Response('allowed'),
            UserRole::Administrator->value,
        );
    }
}
