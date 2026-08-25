<?php

namespace Tests\Feature\Project;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Project;
use App\Models\Sdg;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_exhibitor_can_create_a_draft_with_its_documented_relationships(): void
    {
        [$exhibitor, $category, $sdg, $technology] = $this->projectDependencies();

        $response = $this->actingAs($exhibitor)
            ->postJson('/api/v1/exhibitor/projects', $this->payload(
                $category,
                $sdg,
                $technology,
            ))
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.status', ProjectStatus::Draft->value)
            ->assertJsonPath('data.category.id', $category->getKey())
            ->assertJsonPath('data.members.0.matric_number', '24WMR00001')
            ->assertJsonPath('data.sdgs.0.code', '8')
            ->assertJsonPath('data.technologies.0.name', 'Laravel');

        $projectId = $response->json('data.id');

        $this->assertDatabaseHas('projects', [
            'id' => $projectId,
            'user_id' => $exhibitor->getKey(),
            'slug' => 'sustainable-malaysia-companion',
            'status' => ProjectStatus::Draft->value,
        ]);
        $this->assertDatabaseHas('project_members', [
            'project_id' => $projectId,
            'matric_number' => '24WMR00001',
        ]);
        $this->assertDatabaseHas('project_sdgs', [
            'project_id' => $projectId,
            'sdg_id' => $sdg->getKey(),
        ]);
        $this->assertDatabaseHas('project_technologies', [
            'project_id' => $projectId,
            'technology_id' => $technology->getKey(),
        ]);
    }

    public function test_project_slugs_remain_unique_and_change_with_a_draft_title(): void
    {
        [$exhibitor, $category, $sdg, $technology] = $this->projectDependencies();
        $payload = $this->payload($category, $sdg, $technology);

        $first = $this->actingAs($exhibitor)
            ->postJson('/api/v1/exhibitor/projects', $payload)
            ->assertCreated()
            ->json('data');
        $second = $this->actingAs($exhibitor)
            ->postJson('/api/v1/exhibitor/projects', $payload)
            ->assertCreated()
            ->assertJsonPath('data.slug', 'sustainable-malaysia-companion-2')
            ->json('data');

        $this->actingAs($exhibitor)
            ->patchJson("/api/v1/exhibitor/projects/{$second['id']}", [
                'title' => 'Community Heritage Explorer',
            ])
            ->assertOk()
            ->assertJsonPath('data.slug', 'community-heritage-explorer');

        $this->assertSame(
            'sustainable-malaysia-companion',
            Project::query()->findOrFail($first['id'])->slug,
        );
    }

    public function test_exhibitor_lists_and_views_only_their_projects(): void
    {
        [$exhibitor, $category] = $this->projectDependencies();
        $otherExhibitor = User::factory()->create([
            'role' => UserRole::Exhibitor,
        ]);
        $ownedProject = Project::factory()->for($exhibitor, 'owner')->for($category)->create();
        $otherProject = Project::factory()->for($otherExhibitor, 'owner')->for($category)->create();

        $this->actingAs($exhibitor)
            ->getJson('/api/v1/exhibitor/projects')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $ownedProject->getKey());

        $this->actingAs($exhibitor)
            ->getJson("/api/v1/exhibitor/projects/{$otherProject->getKey()}")
            ->assertForbidden();
    }

    public function test_exhibitor_can_filter_their_paginated_projects_by_documented_status(): void
    {
        [$exhibitor, $category] = $this->projectDependencies();
        Project::factory()
            ->for($exhibitor, 'owner')
            ->for($category)
            ->create(['status' => ProjectStatus::Draft]);
        $submitted = Project::factory()
            ->for($exhibitor, 'owner')
            ->for($category)
            ->create(['status' => ProjectStatus::Submitted]);

        $this->actingAs($exhibitor)
            ->getJson('/api/v1/exhibitor/projects?status=Submitted')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $submitted->getKey())
            ->assertJsonPath('data.0.status', ProjectStatus::Submitted->value);

        $this->actingAs($exhibitor)
            ->getJson('/api/v1/exhibitor/projects?status=Rejected')
            ->assertUnprocessable()
            ->assertJsonValidationErrors('status');
    }

    public function test_draft_can_replace_nested_data_and_then_be_submitted(): void
    {
        [$exhibitor, $category, $sdg, $technology] = $this->projectDependencies();
        $projectId = $this->actingAs($exhibitor)
            ->postJson(
                '/api/v1/exhibitor/projects',
                $this->payload($category, $sdg, $technology),
            )
            ->assertCreated()
            ->json('data.id');

        $this->actingAs($exhibitor)
            ->patchJson("/api/v1/exhibitor/projects/{$projectId}", [
                'team_name' => 'Harmony Builders',
                'members' => [],
                'technology_ids' => [],
            ])
            ->assertOk()
            ->assertJsonPath('data.team_name', 'Harmony Builders')
            ->assertJsonCount(0, 'data.members')
            ->assertJsonCount(0, 'data.technologies');

        $this->actingAs($exhibitor)
            ->postJson("/api/v1/exhibitor/projects/{$projectId}/submit")
            ->assertOk()
            ->assertJsonPath('data.status', ProjectStatus::Submitted->value);

        $this->actingAs($exhibitor)
            ->patchJson("/api/v1/exhibitor/projects/{$projectId}", [
                'team_name' => 'Too Late',
            ])
            ->assertConflict()
            ->assertJsonPath('message', 'Only draft projects can be changed.');

        $this->actingAs($exhibitor)
            ->deleteJson("/api/v1/exhibitor/projects/{$projectId}")
            ->assertConflict();
    }

    public function test_project_links_are_restricted_to_the_documented_services(): void
    {
        [$exhibitor, $category, $sdg, $technology] = $this->projectDependencies();
        $payload = $this->payload($category, $sdg, $technology);
        $payload['github_url'] = 'https://example.com/source';
        $payload['figma_url'] = 'https://example.com/design';
        $payload['video_url'] = 'https://example.com/video';

        $this->actingAs($exhibitor)
            ->postJson('/api/v1/exhibitor/projects', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'github_url',
                'figma_url',
                'video_url',
            ]);
    }

    public function test_project_routes_enforce_authentication_and_exhibitor_role(): void
    {
        $this->getJson('/api/v1/exhibitor/projects')->assertUnauthorized();

        $guest = User::factory()->create(['role' => UserRole::Guest]);

        $this->actingAs($guest)
            ->getJson('/api/v1/exhibitor/projects')
            ->assertForbidden();
        $this->actingAs($guest)
            ->getJson('/api/v1/exhibitor/taxonomies')
            ->assertForbidden();
    }

    /**
     * @return array{User, Category, Sdg, Technology}
     */
    private function projectDependencies(): array
    {
        return [
            User::factory()->create(['role' => UserRole::Exhibitor]),
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
     * @return array<string, mixed>
     */
    private function payload(
        Category $category,
        Sdg $sdg,
        Technology $technology,
    ): array {
        return [
            'category_id' => $category->getKey(),
            'title' => 'Sustainable Malaysia Companion',
            'subtitle' => 'Travel better',
            'team_name' => 'Nexus Team',
            'abstract' => 'A concise project summary.',
            'problem_statement' => 'Travellers lack one trusted planning tool.',
            'proposed_solution' => 'A verified sustainable travel companion.',
            'objectives' => 'Improve discovery and responsible travel choices.',
            'target_users' => 'Domestic and international travellers.',
            'expected_impact' => 'More support for local communities.',
            'methodology' => 'Agile iterative development.',
            'system_architecture' => 'Laravel API with a React client.',
            'github_url' => 'https://github.com/example/nexus',
            'demo_url' => 'https://demo.example.com',
            'figma_url' => 'https://www.figma.com/design/example',
            'video_url' => 'https://youtu.be/example',
            'members' => [
                [
                    'student_name' => 'Aina Tan',
                    'matric_number' => '24WMR00001',
                    'programme' => 'Software Engineering',
                    'supervisor' => 'Dr. Lee',
                ],
            ],
            'sdgs' => [
                [
                    'id' => $sdg->getKey(),
                    'contribution_description' => 'Connects travellers with local enterprises.',
                ],
            ],
            'technology_ids' => [$technology->getKey()],
        ];
    }
}
