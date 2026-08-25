<?php

namespace Database\Seeders;

use App\Models\Technology;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    /**
     * Seed the documented example technology tags.
     */
    public function run(): void
    {
        $technologies = [
            'Laravel',
            'React',
            'Tailwind CSS',
            'MySQL',
            'Flutter',
            'Firebase',
            'Node.js',
            'Python',
            'Docker',
            'TensorFlow',
        ];

        foreach ($technologies as $technology) {
            Technology::query()->firstOrCreate(['name' => $technology]);
        }
    }
}
