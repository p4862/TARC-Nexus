<?php

namespace Tests\Feature\Project;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectMediaTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_upload_and_remove_validated_project_media(): void
    {
        Storage::fake('public');
        $project = Project::factory()->create();
        $owner = $project->owner;

        $response = $this->actingAs($owner)
            ->postJson("/api/v1/exhibitor/projects/{$project->getKey()}/media", [
                'type' => 'image',
                'file' => UploadedFile::fake()->image('screenshot.webp', 1280, 720),
            ])
            ->assertCreated()
            ->assertJsonPath('data.type', 'image')
            ->assertJsonPath('data.filename', 'screenshot.webp');

        $mediaId = $response->json('data.id');
        $media = $project->media()->findOrFail($mediaId);
        Storage::disk('public')->assertExists($media->path);
        $this->assertNotNull($media->thumbnail);
        $this->assertStringEndsWith('.webp', $media->thumbnail);
        Storage::disk('public')->assertExists($media->thumbnail);

        [$thumbnailWidth, $thumbnailHeight] = getimagesize(
            Storage::disk('public')->path($media->thumbnail),
        );
        $this->assertLessThanOrEqual(
            config('project_media.thumbnail.max_width'),
            $thumbnailWidth,
        );
        $this->assertLessThanOrEqual(
            config('project_media.thumbnail.max_height'),
            $thumbnailHeight,
        );

        $this->actingAs($owner)
            ->deleteJson(
                "/api/v1/exhibitor/projects/{$project->getKey()}/media/{$mediaId}"
            )
            ->assertOk();

        Storage::disk('public')->assertMissing($media->path);
        Storage::disk('public')->assertMissing($media->thumbnail);
        $this->assertDatabaseMissing('media', ['id' => $mediaId]);
    }

    public function test_documents_include_uploaded_slide_decks_without_a_schema_extension(): void
    {
        Storage::fake('public');
        $project = Project::factory()->create();

        $this->actingAs($project->owner)
            ->postJson("/api/v1/exhibitor/projects/{$project->getKey()}/media", [
                'type' => 'document',
                'file' => UploadedFile::fake()->create(
                    'presentation-slides.pptx',
                    500,
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                ),
            ])
            ->assertCreated()
            ->assertJsonPath('data.type', 'document')
            ->assertJsonPath('data.filename', 'presentation-slides.pptx');
    }

    public function test_upload_rejects_mismatched_and_unsupported_files(): void
    {
        Storage::fake('public');
        $project = Project::factory()->create();

        $this->actingAs($project->owner)
            ->postJson("/api/v1/exhibitor/projects/{$project->getKey()}/media", [
                'type' => 'image',
                'file' => UploadedFile::fake()->create(
                    'payload.svg',
                    10,
                    'image/svg+xml',
                ),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('file');

        $this->actingAs($project->owner)
            ->postJson("/api/v1/exhibitor/projects/{$project->getKey()}/media", [
                'type' => 'archive',
                'file' => UploadedFile::fake()->create('payload.zip', 10),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['type', 'file']);
    }

    public function test_upload_rejects_raster_images_with_unsafe_dimensions(): void
    {
        Storage::fake('public');
        $project = Project::factory()->create();
        $maximumWidth = (int) config('project_media.types.image.max_width');

        $this->actingAs($project->owner)
            ->postJson("/api/v1/exhibitor/projects/{$project->getKey()}/media", [
                'type' => 'image',
                'file' => UploadedFile::fake()->image(
                    'too-wide.jpg',
                    $maximumWidth + 1,
                    10,
                ),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('file');

        $this->assertDatabaseCount('media', 0);
    }

    public function test_non_owner_and_submitted_projects_cannot_change_media(): void
    {
        Storage::fake('public');
        $project = Project::factory()->create([
            'status' => ProjectStatus::Submitted,
        ]);
        $otherExhibitor = User::factory()->create([
            'role' => UserRole::Exhibitor,
        ]);
        $file = fn () => UploadedFile::fake()->image('screenshot.jpg');

        $this->actingAs($project->owner)
            ->postJson("/api/v1/exhibitor/projects/{$project->getKey()}/media", [
                'type' => 'image',
                'file' => $file(),
            ])
            ->assertConflict();

        $draft = Project::factory()->create();

        $this->actingAs($otherExhibitor)
            ->postJson("/api/v1/exhibitor/projects/{$draft->getKey()}/media", [
                'type' => 'image',
                'file' => $file(),
            ])
            ->assertForbidden();
    }
}
