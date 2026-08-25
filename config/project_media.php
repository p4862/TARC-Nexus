<?php

return [
    'disk' => env('PROJECT_MEDIA_DISK', 'public'),
    'directory' => env('PROJECT_MEDIA_DIRECTORY', 'projects'),

    'types' => [
        'image' => [
            'extensions' => ['jpg', 'jpeg', 'png', 'webp'],
            'mime_types' => ['image/jpeg', 'image/png', 'image/webp'],
            'max_kilobytes' => (int) env('PROJECT_MEDIA_IMAGE_MAX_KB', 10240),
            'max_width' => (int) env('PROJECT_MEDIA_IMAGE_MAX_WIDTH', 6000),
            'max_height' => (int) env('PROJECT_MEDIA_IMAGE_MAX_HEIGHT', 6000),
            'max_pixels' => (int) env('PROJECT_MEDIA_IMAGE_MAX_PIXELS', 24000000),
        ],
        'poster' => [
            'extensions' => ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
            'mime_types' => ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
            'max_kilobytes' => (int) env('PROJECT_MEDIA_POSTER_MAX_KB', 20480),
            'max_width' => (int) env('PROJECT_MEDIA_POSTER_MAX_WIDTH', 8000),
            'max_height' => (int) env('PROJECT_MEDIA_POSTER_MAX_HEIGHT', 8000),
            'max_pixels' => (int) env('PROJECT_MEDIA_POSTER_MAX_PIXELS', 40000000),
        ],
        'video' => [
            'extensions' => ['mp4', 'webm'],
            'mime_types' => ['video/mp4', 'video/webm'],
            'max_kilobytes' => (int) env('PROJECT_MEDIA_VIDEO_MAX_KB', 102400),
        ],
        'document' => [
            'extensions' => ['pdf', 'docx', 'ppt', 'pptx'],
            'mime_types' => [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            ],
            'max_kilobytes' => (int) env('PROJECT_MEDIA_DOCUMENT_MAX_KB', 20480),
        ],
    ],

    'thumbnail' => [
        'max_width' => (int) env('PROJECT_MEDIA_THUMBNAIL_MAX_WIDTH', 960),
        'max_height' => (int) env('PROJECT_MEDIA_THUMBNAIL_MAX_HEIGHT', 720),
        'quality' => (int) env('PROJECT_MEDIA_THUMBNAIL_QUALITY', 82),
    ],
];
