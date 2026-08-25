<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta
            name="description"
            content="TARC Nexus is the online exhibition for VM2026 student digital innovations."
        >

        <title>{{ config('app.name', 'TARC Nexus') }}</title>

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body>
        <div id="root"></div>
        <noscript>This application requires JavaScript to display the online exhibition.</noscript>
    </body>
</html>
