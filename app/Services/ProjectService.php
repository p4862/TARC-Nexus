<?php

namespace App\Services;

use App\Enums\ProjectStatus;
use App\Exceptions\ProjectStateException;
use App\Models\Project;
use App\Models\User;
use App\Repositories\Contracts\ProjectRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectService
{
    public function __construct(
        private readonly ProjectRepositoryInterface $projects,
    ) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function createDraft(User $owner, array $attributes): Project
    {
        return DB::transaction(function () use ($owner, $attributes): Project {
            $project = $this->projects->create([
                ...$this->projectAttributes($attributes),
                'user_id' => $owner->getKey(),
                'slug' => $this->uniqueSlug((string) $attributes['title']),
                'status' => ProjectStatus::Draft,
            ]);

            $this->syncRelationships($project, $attributes, true);

            return $this->projects->loadDetails($project);
        });
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateDraft(Project $project, array $attributes): Project
    {
        $this->ensureDraft($project);

        return DB::transaction(function () use ($project, $attributes): Project {
            $projectAttributes = $this->projectAttributes($attributes);

            if (array_key_exists('title', $projectAttributes)
                && $projectAttributes['title'] !== $project->title) {
                $projectAttributes['slug'] = $this->uniqueSlug(
                    (string) $projectAttributes['title'],
                    (int) $project->getKey(),
                );
            }

            $project = $this->projects->update($project, $projectAttributes);
            $this->syncRelationships($project, $attributes, false);

            return $this->projects->loadDetails($project);
        });
    }

    public function submit(Project $project): Project
    {
        $this->ensureDraft($project);
        $project->loadMissing('sdgs');

        if ($project->sdgs->isEmpty()) {
            throw new ProjectStateException(
                'Select at least one SDG contribution before submitting the project.'
            );
        }

        $project = $this->projects->update($project, [
            'status' => ProjectStatus::Submitted,
        ]);

        return $this->projects->loadDetails($project);
    }

    public function deleteDraft(Project $project): void
    {
        $this->ensureDraft($project);
        $project->loadMissing('media');
        $paths = $project->media
            ->flatMap(fn ($media): array => array_filter([
                $media->path,
                $media->thumbnail,
            ]))
            ->all();

        $this->projects->delete($project);

        if ($paths !== []) {
            Storage::disk((string) config('project_media.disk'))->delete($paths);
        }
    }

    public function details(Project $project): Project
    {
        return $this->projects->loadDetails($project);
    }

    public function ensureDraft(Project $project): void
    {
        if ($project->status !== ProjectStatus::Draft) {
            throw new ProjectStateException(
                'Only draft projects can be changed.'
            );
        }
    }

    /**
     * @param  array<string, mixed>  $attributes
     * @return array<string, mixed>
     */
    private function projectAttributes(array $attributes): array
    {
        return Arr::except($attributes, [
            'members',
            'sdgs',
            'technology_ids',
        ]);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function syncRelationships(
        Project $project,
        array $attributes,
        bool $creating,
    ): void {
        if ($creating || array_key_exists('members', $attributes)) {
            $this->projects->replaceMembers(
                $project,
                $attributes['members'] ?? [],
            );
        }

        if ($creating || array_key_exists('sdgs', $attributes)) {
            $sdgs = collect($attributes['sdgs'] ?? [])
                ->mapWithKeys(fn (array $sdg): array => [
                    (int) $sdg['id'] => [
                        'contribution_description' => $sdg['contribution_description'],
                    ],
                ])
                ->all();

            $this->projects->syncSdgs($project, $sdgs);
        }

        if ($creating || array_key_exists('technology_ids', $attributes)) {
            $technologyIds = array_map(
                'intval',
                $attributes['technology_ids'] ?? [],
            );

            $this->projects->syncTechnologies($project, $technologyIds);
        }
    }

    private function uniqueSlug(string $title, ?int $exceptProjectId = null): string
    {
        $base = Str::slug($title);
        $base = $base === '' ? 'project' : $base;
        $slug = $base;
        $suffix = 2;

        while ($this->projects->slugExists($slug, $exceptProjectId)) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }
}
