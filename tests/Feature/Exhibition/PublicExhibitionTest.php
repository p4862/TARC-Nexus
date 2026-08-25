<?php

namespace Tests\Feature\Exhibition;

use App\Enums\MediaType;
use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Media;
use App\Models\Project;
use App\Models\Sdg;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicExhibitionTest extends TestCase
{
    use RefreshDatabase;

    public function test_gallery_is_public_and_returns_only_currently_published_projects(): void
    {
        [$owner, $web] = $this->dependencies();
        $recent = $this->publishedProject($owner, $web, [
            'title' => 'Recent Published Project',
            'published_at' => now()->subDay(),
        ]);
        $older = $this->publishedProject($owner, $web, [
            'title' => 'Older Published Project',
            'published_at' => now()->subMonth(),
        ]);
        Project::factory()->for($owner, 'owner')->for($web)->create([
            'title' => 'Private Draft',
            'status' => ProjectStatus::Draft,
        ]);
        Project::factory()->for($owner, 'owner')->for($web)->create([
            'title' => 'Future Publication',
            'status' => ProjectStatus::Published,
            'published_at' => now()->addDay(),
        ]);

        $this->getJson('/api/v1/public/projects')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $recent->getKey())
            ->assertJsonPath('data.1.id', $older->getKey())
            ->assertJsonMissing(['title' => 'Private Draft'])
            ->assertJsonMissing(['title' => 'Future Publication']);
    }

    public function test_gallery_searches_filters_sorts_and_paginates_published_projects(): void
    {
        [$owner, $web, $sdg8, $laravel] = $this->dependencies();
        $mobile = Category::factory()->create(['name' => 'Mobile Application']);
        $sdg11 = Sdg::query()->create([
            'code' => '11',
            'title' => 'Sustainable Cities and Communities',
            'description' => 'Supports inclusive communities.',
        ]);
        $react = Technology::factory()->create(['name' => 'React']);

        $matching = $this->publishedProject($owner, $web, [
            'title' => 'Community Heritage Explorer',
            'team_name' => 'Harmony Team',
            'views_count' => 5,
            'published_at' => '2026-05-01 12:00:00',
        ]);
        $matching->members()->create([
            'student_name' => 'Aina Tan',
            'matric_number' => '24WMR00001',
            'programme' => 'Software Engineering',
            'supervisor' => 'Dr. Lee',
        ]);
        $matching->sdgs()->attach($sdg8, [
            'contribution_description' => 'Supports local tourism businesses.',
        ]);
        $matching->technologies()->attach($laravel);

        $popular = $this->publishedProject($owner, $mobile, [
            'title' => 'Zesty Travel Companion',
            'views_count' => 50,
            'published_at' => '2025-05-01 12:00:00',
        ]);
        $popular->sdgs()->attach($sdg11, [
            'contribution_description' => 'Improves city navigation.',
        ]);
        $popular->technologies()->attach($react);

        $filters = http_build_query([
            'search' => 'Aina',
            'category_id' => $web->getKey(),
            'sdg_id' => $sdg8->getKey(),
            'technology_id' => $laravel->getKey(),
            'year' => 2026,
        ]);

        $this->getJson("/api/v1/public/projects?{$filters}")
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $matching->getKey());

        $this->getJson('/api/v1/public/projects?sort=viewed')
            ->assertOk()
            ->assertJsonPath('data.0.id', $popular->getKey());

        $this->getJson('/api/v1/public/projects?sort=alphabetical&per_page=1')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $matching->getKey())
            ->assertJsonPath('meta.per_page', 1)
            ->assertJsonPath('meta.total', 2);
    }

    public function test_category_sdg_and_technology_views_apply_the_route_filter(): void
    {
        [$owner, $web, $sdg8, $laravel] = $this->dependencies();
        $matching = $this->publishedProject($owner, $web);
        $matching->sdgs()->attach($sdg8, [
            'contribution_description' => 'Creates economic opportunity.',
        ]);
        $matching->technologies()->attach($laravel);

        $otherCategory = Category::factory()->create([
            'name' => 'Artificial Intelligence',
        ]);
        $this->publishedProject($owner, $otherCategory);

        foreach ([
            "/api/v1/public/categories/{$web->getKey()}/projects",
            "/api/v1/public/sdgs/{$sdg8->getKey()}/projects",
            "/api/v1/public/technologies/{$laravel->getKey()}/projects",
        ] as $path) {
            $this->getJson($path)
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.id', $matching->getKey());
        }
    }

    public function test_detail_increments_views_and_excludes_private_review_and_student_fields(): void
    {
        [$owner, $web, $sdg8, $laravel] = $this->dependencies();
        $project = $this->publishedProject($owner, $web, [
            'views_count' => 8,
            'review_notes' => 'Private administrator feedback.',
        ]);
        $project->members()->create([
            'student_name' => 'Aina Tan',
            'matric_number' => '24WMR00001',
            'programme' => 'Software Engineering',
            'supervisor' => 'Dr. Lee',
        ]);
        $project->sdgs()->attach($sdg8, [
            'contribution_description' => 'Creates economic opportunity.',
        ]);
        $project->technologies()->attach($laravel);
        Media::query()->create([
            'project_id' => $project->getKey(),
            'type' => MediaType::Image,
            'filename' => 'project-screen.webp',
            'path' => 'projects/example/project-screen.webp',
            'uploaded_at' => now(),
        ]);

        $this->getJson("/api/v1/public/projects/{$project->slug}")
            ->assertOk()
            ->assertJsonPath('data.views_count', 9)
            ->assertJsonPath('data.members.0.student_name', 'Aina Tan')
            ->assertJsonPath('data.sdgs.0.contribution_description', 'Creates economic opportunity.')
            ->assertJsonPath('data.media.0.filename', 'project-screen.webp')
            ->assertJsonMissingPath('data.review_notes')
            ->assertJsonMissingPath('data.members.0.matric_number')
            ->assertJsonMissingPath('data.status');

        $this->assertDatabaseHas('projects', [
            'id' => $project->getKey(),
            'views_count' => 9,
        ]);
    }

    public function test_unpublished_and_future_project_details_return_not_found(): void
    {
        [$owner, $web] = $this->dependencies();
        $draft = Project::factory()->for($owner, 'owner')->for($web)->create();
        $future = Project::factory()->for($owner, 'owner')->for($web)->create([
            'status' => ProjectStatus::Published,
            'published_at' => now()->addDay(),
        ]);

        foreach ([$draft, $future] as $project) {
            $this->getJson("/api/v1/public/projects/{$project->slug}")
                ->assertNotFound()
                ->assertJsonPath(
                    'message',
                    'The requested resource was not found.',
                );
        }
    }

    public function test_homepage_and_taxonomies_use_real_published_data_without_visitor_metrics(): void
    {
        [$owner, $web, $sdg8, $laravel] = $this->dependencies();
        $featured = $this->publishedProject($owner, $web, [
            'title' => 'Featured Project',
            'featured' => true,
            'views_count' => 10,
        ]);
        $featured->members()->create([
            'student_name' => 'Aina Tan',
            'matric_number' => '24WMR00001',
            'programme' => 'Software Engineering',
            'supervisor' => 'Dr. Lee',
        ]);
        $featured->sdgs()->attach($sdg8, [
            'contribution_description' => 'Creates economic opportunity.',
        ]);
        $featured->technologies()->attach($laravel);

        $draft = Project::factory()->for($owner, 'owner')->for($web)->create();
        $draft->members()->create([
            'student_name' => 'Hidden Student',
            'matric_number' => '24WMR00999',
            'programme' => 'Software Engineering',
            'supervisor' => 'Dr. Lee',
        ]);

        $this->getJson('/api/v1/public/homepage')
            ->assertOk()
            ->assertJsonPath('data.statistics.projects', 1)
            ->assertJsonPath('data.statistics.students', 1)
            ->assertJsonPath('data.statistics.institutions', 1)
            ->assertJsonCount(1, 'data.featured_projects')
            ->assertJsonPath('data.featured_projects.0.id', $featured->getKey())
            ->assertJsonPath('data.categories.0.projects_count', 1)
            ->assertJsonPath('data.sdgs.0.projects_count', 1)
            ->assertJsonMissingPath('data.statistics.visitors');

        $this->getJson('/api/v1/public/taxonomies')
            ->assertOk()
            ->assertJsonPath('data.categories.0.projects_count', 1)
            ->assertJsonPath('data.technologies.0.projects_count', 1);
    }

    public function test_gallery_resources_do_not_lazy_load_relationships(): void
    {
        [$owner, $web, $sdg8] = $this->dependencies();
        $project = $this->publishedProject($owner, $web);
        $project->sdgs()->attach($sdg8, [
            'contribution_description' => 'Creates economic opportunity.',
        ]);

        Model::preventLazyLoading();

        try {
            $this->getJson('/api/v1/public/projects')
                ->assertOk()
                ->assertJsonCount(1, 'data');
        } finally {
            Model::preventLazyLoading(false);
        }
    }

    public function test_gallery_rejects_invalid_discovery_parameters(): void
    {
        $this->getJson('/api/v1/public/projects?sort=oldest&per_page=100')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['sort', 'per_page']);
    }

    /**
     * @return array{User, Category, Sdg, Technology}
     */
    private function dependencies(): array
    {
        return [
            User::factory()->create([
                'role' => UserRole::Exhibitor,
                'institution' => 'Tunku Abdul Rahman University',
            ]),
            Category::factory()->create(['name' => 'Web Application']),
            Sdg::query()->create([
                'code' => '8',
                'title' => 'Decent Work and Economic Growth',
                'description' => 'Supports inclusive economic opportunity.',
            ]),
            Technology::factory()->create(['name' => 'Laravel']),
        ];
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function publishedProject(
        User $owner,
        Category $category,
        array $attributes = [],
    ): Project {
        return Project::factory()
            ->for($owner, 'owner')
            ->for($category)
            ->create([
                'status' => ProjectStatus::Published,
                'published_at' => now()->subDay(),
                ...$attributes,
            ]);
    }
}
