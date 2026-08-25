<?php

namespace Tests\Feature\Engagement;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Project;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VisitorEngagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_manage_an_idempotent_favorite_and_list_favorites(): void
    {
        [$project, $guest] = $this->publishedProjectAndGuest();
        $endpoint = "/api/v1/engagement/projects/{$project->slug}/favorite";

        $this->actingAs($guest)
            ->postJson($endpoint)
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.is_favorited', true)
            ->assertJsonPath('data.favorites_count', 1);

        $this->actingAs($guest)
            ->postJson($endpoint)
            ->assertOk()
            ->assertJsonPath(
                'message',
                'Project is already in your favorites.',
            )
            ->assertJsonPath('data.favorites_count', 1);

        $this->assertDatabaseCount('favorites', 1);

        $this->actingAs($guest)
            ->getJson('/api/v1/engagement/favorites')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $project->getKey())
            ->assertJsonPath('data.0.is_favorited', true);

        $this->actingAs($guest)
            ->deleteJson($endpoint)
            ->assertOk()
            ->assertJsonPath('data.is_favorited', false)
            ->assertJsonPath('data.favorites_count', 0);

        $this->actingAs($guest)
            ->deleteJson($endpoint)
            ->assertOk()
            ->assertJsonPath('data.favorites_count', 0);
    }

    public function test_people_choice_vote_is_unique_and_cannot_be_retracted(): void
    {
        [$project, $guest] = $this->publishedProjectAndGuest();
        $endpoint = "/api/v1/engagement/projects/{$project->slug}/vote";

        $this->actingAs($guest)
            ->postJson($endpoint)
            ->assertCreated()
            ->assertJsonPath('data.has_voted', true)
            ->assertJsonPath('data.votes_count', 1);

        $this->actingAs($guest)
            ->postJson($endpoint)
            ->assertConflict()
            ->assertJsonPath(
                'message',
                'You have already voted for this project.',
            );

        $this->assertDatabaseCount('votes', 1);
        $this->assertDatabaseHas('votes', [
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
        ]);
    }

    public function test_engagement_requires_an_authenticated_guest_and_a_published_project(): void
    {
        [$project] = $this->publishedProjectAndGuest();
        $draft = Project::factory()
            ->for($project->owner, 'owner')
            ->for($project->category)
            ->create();
        $exhibitor = User::factory()->create([
            'role' => UserRole::Exhibitor,
        ]);

        $this->postJson(
            "/api/v1/engagement/projects/{$project->slug}/favorite",
        )->assertUnauthorized();

        foreach ([
            "/api/v1/engagement/projects/{$project->slug}/favorite",
            "/api/v1/engagement/projects/{$project->slug}/vote",
        ] as $endpoint) {
            $this->actingAs($exhibitor)
                ->postJson($endpoint)
                ->assertForbidden();
        }

        $guest = User::factory()->create(['role' => UserRole::Guest]);

        $this->actingAs($guest)
            ->postJson(
                "/api/v1/engagement/projects/{$draft->slug}/favorite",
            )
            ->assertForbidden();
        $this->actingAs($guest)
            ->postJson(
                "/api/v1/engagement/projects/{$draft->slug}/vote",
            )
            ->assertForbidden();
    }

    public function test_guests_and_the_project_owner_can_create_threaded_comments(): void
    {
        [$project, $guest] = $this->publishedProjectAndGuest();
        $otherProject = $this->publishedProject();
        $root = $this->actingAs($guest)
            ->postJson(
                "/api/v1/engagement/projects/{$project->slug}/comments",
                ['comment' => 'How does this support local communities?'],
            )
            ->assertCreated()
            ->assertJsonPath('data.author.name', $guest->name)
            ->json('data');

        $this->actingAs($project->owner)
            ->postJson(
                "/api/v1/engagement/projects/{$project->slug}/comments",
                [
                    'comment' => 'It connects visitors with local businesses.',
                    'parent_id' => $root['id'],
                ],
            )
            ->assertCreated()
            ->assertJsonPath('data.parent_id', $root['id']);

        $nonOwner = User::factory()->create([
            'role' => UserRole::Exhibitor,
        ]);
        $this->actingAs($nonOwner)
            ->postJson(
                "/api/v1/engagement/projects/{$project->slug}/comments",
                ['comment' => 'An unauthorized exhibitor response.'],
            )
            ->assertForbidden();

        $foreignComment = Comment::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $otherProject->getKey(),
            'comment' => 'A different project discussion.',
        ]);
        $this->actingAs($guest)
            ->postJson(
                "/api/v1/engagement/projects/{$project->slug}/comments",
                [
                    'comment' => 'Cross-project reply.',
                    'parent_id' => $foreignComment->getKey(),
                ],
            )
            ->assertUnprocessable()
            ->assertJsonValidationErrors('parent_id');

        Model::preventLazyLoading();

        try {
            $this->getJson(
                "/api/v1/public/projects/{$project->slug}/comments",
            )
                ->assertOk()
                ->assertJsonPath('comments_count', 2)
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.id', $root['id'])
                ->assertJsonCount(1, 'data.0.replies')
                ->assertJsonPath(
                    'data.0.replies.0.author.role',
                    UserRole::Exhibitor->value,
                );
        } finally {
            Model::preventLazyLoading(false);
        }
    }

    public function test_administrator_can_moderate_a_comment_thread(): void
    {
        [$project, $guest] = $this->publishedProjectAndGuest();
        $parent = Comment::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
            'comment' => 'Parent comment.',
        ]);
        $reply = Comment::query()->create([
            'user_id' => $project->user_id,
            'project_id' => $project->getKey(),
            'parent_id' => $parent->getKey(),
            'comment' => 'Project owner reply.',
        ]);

        $this->actingAs($guest)
            ->deleteJson("/api/v1/engagement/comments/{$parent->getKey()}")
            ->assertForbidden();

        $administrator = User::factory()->create([
            'role' => UserRole::Administrator,
        ]);
        $this->actingAs($administrator)
            ->deleteJson("/api/v1/engagement/comments/{$parent->getKey()}")
            ->assertOk()
            ->assertJsonPath(
                'message',
                'Comment thread removed successfully.',
            );

        $this->assertDatabaseMissing('comments', ['id' => $parent->getKey()]);
        $this->assertDatabaseMissing('comments', ['id' => $reply->getKey()]);
    }

    public function test_public_resources_include_interaction_state_and_popularity_uses_engagement(): void
    {
        [$mostViewed, $guest] = $this->publishedProjectAndGuest([
            'title' => 'Most Viewed',
            'views_count' => 2,
        ]);
        $engaged = $this->publishedProject([
            'title' => 'Most Engaged',
            'views_count' => 1,
        ]);
        Favorite::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $engaged->getKey(),
        ]);
        Vote::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $engaged->getKey(),
        ]);
        Comment::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $engaged->getKey(),
            'comment' => 'A useful project.',
        ]);

        $this->actingAs($guest)
            ->getJson('/api/v1/public/projects?sort=popular')
            ->assertOk()
            ->assertJsonPath('data.0.id', $engaged->getKey())
            ->assertJsonPath('data.0.favorites_count', 1)
            ->assertJsonPath('data.0.votes_count', 1)
            ->assertJsonPath('data.0.comments_count', 1)
            ->assertJsonPath('data.0.is_favorited', true)
            ->assertJsonPath('data.0.has_voted', true);

        $this->getJson('/api/v1/public/projects?sort=viewed')
            ->assertOk()
            ->assertJsonPath('data.0.id', $mostViewed->getKey());
    }

    public function test_project_and_user_deletion_cascade_engagement_records(): void
    {
        [$project, $guest] = $this->publishedProjectAndGuest();
        Favorite::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
        ]);
        Vote::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
        ]);
        Comment::query()->create([
            'user_id' => $guest->getKey(),
            'project_id' => $project->getKey(),
            'comment' => 'This will be removed with the user.',
        ]);

        $guest->delete();

        $this->assertDatabaseCount('favorites', 0);
        $this->assertDatabaseCount('votes', 0);
        $this->assertDatabaseCount('comments', 0);
    }

    /**
     * @param  array<string, mixed>  $attributes
     * @return array{Project, User}
     */
    private function publishedProjectAndGuest(array $attributes = []): array
    {
        return [
            $this->publishedProject($attributes),
            User::factory()->create(['role' => UserRole::Guest]),
        ];
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function publishedProject(array $attributes = []): Project
    {
        $owner = User::factory()->create([
            'role' => UserRole::Exhibitor,
        ]);
        $category = Category::factory()->create();

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
