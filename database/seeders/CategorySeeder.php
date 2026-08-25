<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed the documented digital-solution categories.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Web Application', 'description' => 'Browser-based software delivered through the web.'],
            ['name' => 'Mobile Application', 'description' => 'Native or cross-platform applications for mobile devices.'],
            ['name' => 'Progressive Web App (PWA)', 'description' => 'Installable web applications with progressive capabilities.'],
            ['name' => 'Desktop Application', 'description' => 'Software designed for desktop operating systems.'],
            ['name' => 'Artificial Intelligence', 'description' => 'Solutions using machine learning or other artificial intelligence techniques.'],
            ['name' => 'Internet of Things (IoT)', 'description' => 'Connected-device and sensor-based digital solutions.'],
            ['name' => 'Data Analytics', 'description' => 'Solutions that transform data into useful insights.'],
            ['name' => 'AR / VR', 'description' => 'Augmented or virtual reality experiences.'],
            ['name' => 'Game Development', 'description' => 'Interactive games and game-based experiences.'],
            ['name' => 'API / Backend Service', 'description' => 'Application programming interfaces and backend services.'],
            ['name' => 'Digital Platform', 'description' => 'Multi-sided or integrated digital platforms.'],
            ['name' => 'Other', 'description' => 'Digital solutions that do not fit another documented category.'],
        ];

        foreach ($categories as $category) {
            Category::query()->updateOrCreate(
                ['name' => $category['name']],
                $category,
            );
        }
    }
}
