<?php

namespace Database\Factories;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(4);

        return [
            'user_id' => User::factory()->state(['role' => UserRole::Exhibitor]),
            'category_id' => Category::factory(),
            'title' => $title,
            'subtitle' => fake()->optional()->sentence(),
            'team_name' => fake()->optional()->company(),
            'slug' => Str::slug($title).'-'.Str::lower(Str::random(6)),
            'abstract' => fake()->paragraph(),
            'problem_statement' => fake()->paragraph(),
            'proposed_solution' => fake()->paragraph(),
            'objectives' => fake()->paragraph(),
            'target_users' => fake()->paragraph(),
            'expected_impact' => fake()->paragraph(),
            'methodology' => fake()->paragraph(),
            'system_architecture' => fake()->paragraph(),
            'github_url' => null,
            'demo_url' => null,
            'figma_url' => null,
            'video_url' => null,
            'status' => ProjectStatus::Draft,
            'featured' => false,
            'views_count' => 0,
        ];
    }
}
