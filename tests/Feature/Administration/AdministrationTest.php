<?php

namespace Tests\Feature\Administration;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Announcement;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\Project;
use App\Models\Sdg;
use App\Models\Technology;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdministrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_is_administrator_only_and_uses_supported_metrics(): void
    {
        [$administrator, $exhibitor, $category] = $this->dependencies();
        User::factory()->create(['role' => UserRole::Guest]);
        Project::factory()->for($exhibitor, 'owner')->for($category)->create([
            'status' => ProjectStatus::Submitted,
        ]);
        Project::factory()->for($exhibitor, 'owner')->for($category)->create([
            'status' => ProjectStatus::Published,
            'published_at' => now()->subDay(),
        ]);

        $this->getJson('/api/v1/administrator/dashboard')
            ->assertUnauthorized();

        $this->actingAs($exhibitor)
            ->getJson('/api/v1/administrator/dashboard')
            ->assertForbidden();

        $this->actingAs($administrator)
            ->getJson('/api/v1/administrator/dashboard')
            ->assertOk()
            ->assertJsonPath('data.statistics.total_projects', 2)
            ->assertJsonPath('data.statistics.total_exhibitors', 1)
            ->assertJsonPath('data.statistics.total_guests', 1)
            ->assertJsonPath('data.statistics.published_projects', 1)
            ->assertJsonPath('data.statistics.pending_approvals', 1)
            ->assertJsonPath('data.popular_categories.0.id', $category->getKey())
            ->assertJsonMissingPath('data.statistics.total_visitors')
            ->assertJsonMissingPath('data.statistics.active_users');
    }

    public function test_administrator_can_search_users_change_roles_and_cannot_mutate_self(): void
    {
        [$administrator] = $this->dependencies();
        $guest = User::factory()->create([
            'name' => 'Aina Visitor',
            'email' => 'aina@example.test',
            'role' => UserRole::Guest,
        ]);

        $this->actingAs($administrator)
            ->getJson('/api/v1/administrator/users?search=Aina&role=Guest')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $guest->getKey());

        $this->actingAs($administrator)
            ->patchJson("/api/v1/administrator/users/{$guest->getKey()}/role", [
                'role' => UserRole::Exhibitor->value,
            ])
            ->assertOk()
            ->assertJsonPath('data.role', UserRole::Exhibitor->value);

        $this->actingAs($administrator)
            ->patchJson("/api/v1/administrator/users/{$administrator->getKey()}/role", [
                'role' => UserRole::Guest->value,
            ])
            ->assertForbidden();

        $this->actingAs($administrator)
            ->deleteJson("/api/v1/administrator/users/{$administrator->getKey()}")
            ->assertForbidden();

        $this->actingAs($administrator)
            ->deleteJson("/api/v1/administrator/users/{$guest->getKey()}")
            ->assertOk();

        $this->assertDatabaseMissing('users', ['id' => $guest->getKey()]);
    }

    public function test_administrator_manages_taxonomies_without_deleting_in_use_records(): void
    {
        [$administrator, $exhibitor, $category] = $this->dependencies();
        Project::factory()->for($exhibitor, 'owner')->for($category)->create();

        $createdCategory = $this->actingAs($administrator)
            ->postJson('/api/v1/administrator/categories', [
                'name' => 'Game Development',
                'description' => 'Interactive tourism games.',
            ])
            ->assertCreated()
            ->json('data.categories.0');

        $this->actingAs($administrator)
            ->patchJson(
                "/api/v1/administrator/categories/{$createdCategory['id']}",
                ['description' => 'Interactive and educational tourism games.'],
            )
            ->assertOk();

        $this->actingAs($administrator)
            ->deleteJson(
                "/api/v1/administrator/categories/{$createdCategory['id']}",
            )
            ->assertOk();

        $this->actingAs($administrator)
            ->deleteJson("/api/v1/administrator/categories/{$category->getKey()}")
            ->assertConflict()
            ->assertJsonPath(
                'message',
                'A category assigned to projects cannot be deleted.',
            );

        $this->actingAs($administrator)
            ->postJson('/api/v1/administrator/technologies', [
                'name' => 'Vue',
            ])
            ->assertCreated()
            ->assertJsonFragment(['name' => 'Vue']);

        $this->actingAs($administrator)
            ->postJson('/api/v1/administrator/sdgs', [
                'code' => '9',
                'title' => 'Industry, Innovation and Infrastructure',
                'description' => 'Outside the approved exhibition scope.',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('code');
    }

    public function test_administrator_can_review_approve_feature_and_schedule_publication(): void
    {
        [$administrator, $exhibitor, $category] = $this->dependencies();
        $project = Project::factory()
            ->for($exhibitor, 'owner')
            ->for($category)
            ->create(['status' => ProjectStatus::Submitted]);

        $this->actingAs($administrator)
            ->postJson(
                "/api/v1/administrator/projects/{$project->getKey()}/start-review",
                ['review_notes' => 'Initial review notes.'],
            )
            ->assertOk()
            ->assertJsonPath('data.status', ProjectStatus::UnderReview->value)
            ->assertJsonPath('data.review_notes', 'Initial review notes.')
            ->assertJsonPath('data.reviewer.id', $administrator->getKey());

        $this->actingAs($administrator)
            ->postJson(
                "/api/v1/administrator/projects/{$project->getKey()}/approve",
                ['review_notes' => 'Approved for the exhibition.'],
            )
            ->assertOk()
            ->assertJsonPath('data.status', ProjectStatus::Approved->value)
            ->assertJsonPath(
                'data.review_notes',
                'Approved for the exhibition.',
            );

        $this->actingAs($administrator)
            ->patchJson(
                "/api/v1/administrator/projects/{$project->getKey()}/featured",
                ['featured' => true],
            )
            ->assertOk()
            ->assertJsonPath('data.featured', true);

        $this->actingAs($administrator)
            ->postJson(
                "/api/v1/administrator/projects/{$project->getKey()}/publish",
                ['published_at' => now()->addDay()->toIso8601String()],
            )
            ->assertOk()
            ->assertJsonPath('data.status', ProjectStatus::Published->value);

        $this->getJson("/api/v1/public/projects/{$project->slug}")
            ->assertNotFound();

        $this->assertDatabaseHas('projects', [
            'id' => $project->getKey(),
            'status' => ProjectStatus::Published->value,
            'reviewed_by' => $administrator->getKey(),
            'featured' => true,
        ]);

        $submitted = Project::factory()
            ->for($exhibitor, 'owner')
            ->for($category)
            ->create(['status' => ProjectStatus::Submitted]);

        $this->actingAs($administrator)
            ->postJson(
                "/api/v1/administrator/projects/{$submitted->getKey()}/approve",
            )
            ->assertConflict();

        $this->actingAs($administrator)
            ->postJson(
                "/api/v1/administrator/projects/{$submitted->getKey()}/reject",
            )
            ->assertNotFound();
    }

    public function test_announcements_are_managed_by_administrators_and_due_items_reach_homepage(): void
    {
        [$administrator] = $this->dependencies();

        $published = $this->actingAs($administrator)
            ->postJson('/api/v1/administrator/announcements', [
                'title' => 'Exhibition opens',
                'content' => 'The virtual exhibition is now open.',
                'published_at' => now()->subHour()->toIso8601String(),
            ])
            ->assertCreated()
            ->json('data');

        $future = Announcement::query()->create([
            'user_id' => $administrator->getKey(),
            'title' => 'Future maintenance',
            'content' => 'The site will be maintained tomorrow.',
            'published_at' => now()->addDay(),
        ]);

        $this->getJson('/api/v1/public/homepage')
            ->assertOk()
            ->assertJsonCount(1, 'data.announcements')
            ->assertJsonPath(
                'data.announcements.0.title',
                'Exhibition opens',
            )
            ->assertJsonMissing(['title' => $future->title]);

        $this->actingAs($administrator)
            ->patchJson(
                "/api/v1/administrator/announcements/{$published['id']}",
                ['title' => 'Exhibition is open'],
            )
            ->assertOk()
            ->assertJsonPath('data.title', 'Exhibition is open');

        $this->actingAs($administrator)
            ->deleteJson(
                "/api/v1/administrator/announcements/{$published['id']}",
            )
            ->assertOk();

        $this->assertDatabaseMissing('announcements', [
            'id' => $published['id'],
        ]);
    }

    public function test_reports_exclude_unsupported_visitor_and_active_user_metrics(): void
    {
        [$administrator, $exhibitor, $category] = $this->dependencies();
        $project = Project::factory()
            ->for($exhibitor, 'owner')
            ->for($category)
            ->create([
                'status' => ProjectStatus::Published,
                'published_at' => now()->subDay(),
            ]);
        $guest = User::factory()->create(['role' => UserRole::Guest]);
        Vote::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
        ]);

        $this->actingAs($administrator)
            ->getJson('/api/v1/administrator/reports')
            ->assertOk()
            ->assertJsonPath('data.projects.total', 1)
            ->assertJsonPath('data.users.total', 3)
            ->assertJsonPath('data.voting.total_votes', 1)
            ->assertJsonPath(
                'data.voting.people_choice_leaders.0.id',
                $project->getKey(),
            )
            ->assertJsonMissingPath('data.users.active_users')
            ->assertJsonMissingPath('data.visitors');
    }

    public function test_exhibitor_analytics_use_only_owned_aggregate_engagement(): void
    {
        [, $exhibitor, $category] = $this->dependencies();
        $project = Project::factory()
            ->for($exhibitor, 'owner')
            ->for($category)
            ->create([
                'status' => ProjectStatus::Published,
                'published_at' => now()->subDay(),
                'views_count' => 12,
            ]);
        $otherExhibitor = User::factory()->create([
            'role' => UserRole::Exhibitor,
        ]);
        Project::factory()
            ->for($otherExhibitor, 'owner')
            ->for($category)
            ->create(['views_count' => 99]);
        $guest = User::factory()->create(['role' => UserRole::Guest]);
        Favorite::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
        ]);
        Vote::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
        ]);

        $this->actingAs($exhibitor)
            ->getJson('/api/v1/exhibitor/analytics')
            ->assertOk()
            ->assertJsonPath('data.summary.projects', 1)
            ->assertJsonPath('data.summary.views', 12)
            ->assertJsonPath('data.summary.favorites', 1)
            ->assertJsonPath('data.summary.votes', 1)
            ->assertJsonCount(1, 'data.projects')
            ->assertJsonPath('data.projects.0.id', $project->getKey())
            ->assertJsonMissingPath('data.visitor_trends')
            ->assertJsonMissingPath('data.referral_sources');

        $this->actingAs($guest)
            ->getJson('/api/v1/exhibitor/analytics')
            ->assertForbidden();
    }

    /**
     * @return array{User, User, Category, Sdg, Technology}
     */
    private function dependencies(): array
    {
        return [
            User::factory()->create(['role' => UserRole::Administrator]),
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
}
