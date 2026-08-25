<?php

return [
    'content_security_policy' => [
        'enabled' => (bool) env(
            'SECURITY_CSP_ENABLED',
            env('APP_ENV', 'production') === 'production',
        ),
    ],

    'hsts' => [
        'enabled' => (bool) env(
            'SECURITY_HSTS_ENABLED',
            env('APP_ENV', 'production') === 'production',
        ),
        'max_age' => (int) env('SECURITY_HSTS_MAX_AGE', 31536000),
        'include_subdomains' => (bool) env(
            'SECURITY_HSTS_INCLUDE_SUBDOMAINS',
            true,
        ),
    ],
];
