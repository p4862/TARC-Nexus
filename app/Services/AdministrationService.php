<?php

namespace App\Services;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Exceptions\AdministrationConflictException;
use App\Exceptions\ProjectStateException;
use App\Models\Project;
use App\Models\User;
use App\Repositories\Contracts\AdministrationRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdministrationService
{
    public function __construct(
        private readonly AdministrationRepositoryInterface $administration,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function dashboard(): array
    {
        return $this->administration->dashboard();
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, User>
     */
    public function users(array $filters): LengthAwarePaginator
    {
        return $this->administration->paginateUsers(
            $filters,
            (int) ($filters['per_page'] ?? 15),
        );
    }

    public function updateUserRole(User $user, UserRole $role): User
    {
        if ($user->role === UserRole::Administrator
            && $role !== UserRole::Administrator
            && $this->administration->administratorCount() <= 1) {
            throw new AdministrationConflictException(
                'The final administrator account cannot be demoted.'
            );
        }

        return $this->administration->updateUserRole($user, $role);
    }

    public function deleteUser(User $user): void
    {
        if ($user->role === UserRole::Administrator
            && $this->administration->administratorCount() <= 1) {
            throw new AdministrationConflictException(
                'The final administrator account cannot be deleted.'
            );
        }

        $paths = DB::transaction(function () use ($user): array {
            $paths = $this->administration->mediaPathsOwnedBy($user);
            $this->administration->deleteUser($user);

            return $paths;
        });

        if ($paths !== []) {
            Storage::disk((string) config('project_media.disk'))->delete($paths);
        }
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, Project>
     */
    public function reviewProjects(array $filters): LengthAwarePaginator
    {
        return $this->administration->paginateProjectsForReview(
            $filters,
            (int) ($filters['per_page'] ?? 12),
        );
    }

    public function reviewProject(Project $project): Project
    {
        return $this->administration->loadProjectForReview($project);
    }

    public function startReview(
        Project $project,
        User $reviewer,
        ?string $notes,
    ): Project {
        return $this->transitionProject(
            $project,
            ProjectStatus::Submitted,
            [
                'status' => ProjectStatus::UnderReview,
                'review_notes' => $notes,
                'reviewed_by' => $reviewer->getKey(),
                'reviewed_at' => now(),
            ],
            'Only submitted projects can enter review.',
        );
    }

    public function approve(
        Project $project,
        User $reviewer,
        ?string $notes,
    ): Project {
        return $this->transitionProject(
            $project,
            ProjectStatus::UnderReview,
            [
                'status' => ProjectStatus::Approved,
                'review_notes' => $notes,
                'reviewed_by' => $reviewer->getKey(),
                'reviewed_at' => now(),
            ],
            'Only projects under review can be approved.',
        );
    }

    public function publish(
        Project $project,
        User $reviewer,
        ?Carbon $publishedAt = null,
    ): Project {
        return $this->transitionProject(
            $project,
            ProjectStatus::Approved,
            [
                'status' => ProjectStatus::Published,
                'reviewed_by' => $reviewer->getKey(),
                'reviewed_at' => now(),
                'published_at' => $publishedAt ?? now(),
            ],
            'Only approved projects can be published.',
        );
    }

    public function setFeatured(Project $project, bool $featured): Project
    {
        return DB::transaction(function () use ($project, $featured): Project {
            $locked = $this->administration->lockProject($project);

            if ($featured && ! in_array($locked->status, [
                ProjectStatus::Approved,
                ProjectStatus::Published,
            ], true)) {
                throw new ProjectStateException(
                    'Only approved or published projects can be featured.'
                );
            }

            return $this->administration->updateProject($locked, [
                'featured' => $featured,
            ]);
        });
    }

    /**
     * @return array<string, mixed>
     */
    public function reports(): array
    {
        return $this->administration->reports();
    }

    /**
     * @return array<string, mixed>
     */
    public function exhibitorAnalytics(
        User $exhibitor,
        int $perPage,
    ): array {
        return $this->administration->exhibitorAnalytics(
            $exhibitor,
            $perPage,
        );
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function transitionProject(
        Project $project,
        ProjectStatus $expected,
        array $attributes,
        string $message,
    ): Project {
        return DB::transaction(function () use (
            $project,
            $expected,
            $attributes,
            $message,
        ): Project {
            $locked = $this->administration->lockProject($project);

            if ($locked->status !== $expected) {
                throw new ProjectStateException($message);
            }

            return $this->administration->updateProject($locked, $attributes);
        });
    }
}
