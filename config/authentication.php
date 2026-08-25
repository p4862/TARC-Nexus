<?php

return [
    'google' => [
        'pending_registration_minutes' => 10,
    ],

    'avatar' => [
        'disk' => env('AVATAR_DISK', 'public'),
        'directory' => 'avatars',
        'max_kilobytes' => 2048,
        'allowed_mime_types' => [
            'image/jpeg',
            'image/png',
            'image/webp',
        ],
        'minimum_dimension' => 64,
        'maximum_dimension' => 2048,
    ],
];
