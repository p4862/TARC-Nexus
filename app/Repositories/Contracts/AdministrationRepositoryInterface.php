<?php

namespace App\Repositories\Contracts;

use App\Enums\UserRole;
use App\Models\Project;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface AdministrationRepositoryInterface
{
    /**
     * @return array<string, mixed>
     */
    public function dashboard(): array;

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, User>
     */
    public function paginateUsers(
        array $filters,
        int $perPage,
    ): LengthAwarePaginator;

    public function updateUserRole(User $user, UserRole $role): User;

    public function administratorCount(): int;

    /**
     * @return list<string>
     */
    public function mediaPathsOwnedBy(User $user): array;

    public function deleteUser(User $user): void;

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, Project>
     */
    public function paginateProjectsForReview(
        array $filters,
        int $perPage,
    ): LengthAwarePaginator;

    public function loadProjectForReview(Project $project): Project;

    public function lockProject(Project $project): Project;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateProject(Project $project, array $attributes): Project;

    /**
     * @return array<string, mixed>
     */
    public function reports(): array;

    /**
     * @return array<string, mixed>
     */
    public function exhibitorAnalytics(
        User $exhibitor,
        int $perPage,
    ): array;
}
