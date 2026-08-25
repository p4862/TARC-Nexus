<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $nonce = config('security.content_security_policy.enabled')
            ? Vite::useCspNonce()
            : null;

        /** @var Response $response */
        $response = $next($request);

        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set(
            'Permissions-Policy',
            'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
        );
        $response->headers->set('X-Permitted-Cross-Domain-Policies', 'none');

        if ($nonce !== null) {
            $response->headers->set(
                'Content-Security-Policy',
                $this->contentSecurityPolicy($nonce, $request->isSecure()),
            );
        }

        if ($request->isSecure() && config('security.hsts.enabled')) {
            $value = 'max-age='.(int) config('security.hsts.max_age');

            if (config('security.hsts.include_subdomains')) {
                $value .= '; includeSubDomains';
            }

            $response->headers->set('Strict-Transport-Security', $value);
        }

        if ($this->containsPrivateData($request)) {
            $response->headers->set('Cache-Control', 'no-store, private');
        }

        return $response;
    }

    private function contentSecurityPolicy(
        string $nonce,
        bool $upgradeInsecureRequests,
    ): string {
        $directives = [
            "default-src 'self'",
            "base-uri 'self'",
            "connect-src 'self'",
            "font-src 'self' data:",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "frame-src 'none'",
            "img-src 'self' data: blob:",
            "media-src 'self' blob:",
            "object-src 'none'",
            "script-src 'self' 'nonce-{$nonce}'",
            "style-src 'self' 'unsafe-inline'",
        ];

        if ($upgradeInsecureRequests) {
            $directives[] = 'upgrade-insecure-requests';
        }

        return implode('; ', $directives);
    }

    private function containsPrivateData(Request $request): bool
    {
        return $request->is(
            'api/v1/auth/*',
            'api/v1/profile',
            'api/v1/profile/*',
            'api/v1/exhibitor/*',
            'api/v1/administrator/*',
            'api/v1/engagement/*',
        );
    }
}
