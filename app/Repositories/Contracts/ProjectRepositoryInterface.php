<?php

namespace App\Repositories\Contracts;

use App\Models\Project;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ProjectRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<int, Project>
     */
    public function paginateOwnedBy(
        User $owner,
        int $perPage,
        ?string $status = null,
    ): LengthAwarePaginator;

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, Project>
     */
    public function paginatePublished(
        array $filters,
        int $perPage,
        ?User $viewer = null,
    ): LengthAwarePaginator;

    /**
     * @return LengthAwarePaginator<int, Project>
     */
    public function paginateFavoritedBy(
        User $user,
        int $perPage,
    ): LengthAwarePaginator;

    /**
     * @return Collection<int, Project>
     */
    public function featuredPublished(
        int $limit,
        ?User $viewer = null,
    ): Collection;

    /**
     * @return Collection<int, Project>
     */
    public function newestPublished(
        int $limit,
        ?User $viewer = null,
    ): Collection;

    /**
     * @return Collection<int, Project>
     */
    public function popularPublished(
        int $limit,
        ?User $viewer = null,
    ): Collection;

    /**
     * @return array{projects: int, students: int, institutions: int}
     */
    public function publicStatistics(): array;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Project;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Project $project, array $attributes): Project;

    /**
     * @param  list<array<string, string>>  $members
     */
    public function replaceMembers(Project $project, array $members): void;

    /**
     * @param  array<int, array{contribution_description: string}>  $sdgs
     */
    public function syncSdgs(Project $project, array $sdgs): void;

    /**
     * @param  list<int>  $technologyIds
     */
    public function syncTechnologies(Project $project, array $technologyIds): void;

    public function loadDetails(Project $project): Project;

    public function loadPublicDetails(
        Project $project,
        ?User $viewer = null,
    ): Project;

    public function incrementViews(Project $project): void;

    public function slugExists(string $slug, ?int $exceptProjectId = null): bool;

    public function delete(Project $project): void;
}
