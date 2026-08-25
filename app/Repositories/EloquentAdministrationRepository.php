<?php

namespace App\Repositories;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\Project;
use App\Models\Sdg;
use App\Models\User;
use App\Models\Vote;
use App\Repositories\Contracts\AdministrationRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class EloquentAdministrationRepository implements AdministrationRepositoryInterface
{
    private const REVIEW_DETAILS = [
        'owner:id,name,email,institution',
        'reviewer:id,name',
        'category',
        'members',
        'sdgs',
        'technologies',
        'media',
    ];

    public function dashboard(): array
    {
        return [
            'total_projects' => Project::query()->count(),
            'total_exhibitors' => User::query()
                ->where('role', UserRole::Exhibitor)
                ->count(),
            'total_guests' => User::query()
                ->where('role', UserRole::Guest)
                ->count(),
            'published_projects' => Project::query()
                ->where('status', ProjectStatus::Published)
                ->count(),
            'pending_approvals' => Project::query()
                ->whereIn('status', [
                    ProjectStatus::Submitted,
                    ProjectStatus::UnderReview,
                ])
                ->count(),
            'popular_categories' => Category::query()
                ->withCount([
                    'projects as published_projects_count' => fn (Builder $query) => $query
                        ->publiclyVisible(),
                ])
                ->orderByDesc('published_projects_count')
                ->orderBy('name')
                ->limit(5)
                ->get(),
            'recent_submissions' => Project::query()
                ->whereIn('status', [
                    ProjectStatus::Submitted,
                    ProjectStatus::UnderReview,
                ])
                ->with([
                    'owner:id,name,email,institution',
                    'category:id,name,description,icon',
                ])
                ->latest('updated_at')
                ->limit(5)
                ->get(),
        ];
    }

    public function paginateUsers(
        array $filters,
        int $perPage,
    ): LengthAwarePaginator {
        $search = trim((string) ($filters['search'] ?? ''));

        return User::query()
            ->withCount('projects')
            ->when(
                $search !== '',
                function (Builder $query) use ($search): void {
                    $pattern = '%'.addcslashes($search, '\\%_').'%';

                    $query->where(function (Builder $query) use ($pattern): void {
                        $query
                            ->where('name', 'like', $pattern)
                            ->orWhere('email', 'like', $pattern)
                            ->orWhere('institution', 'like', $pattern);
                    });
                },
            )
            ->when(
                $filters['role'] ?? null,
                fn (Builder $query, mixed $role) => $query
                    ->where('role', $role),
            )
            ->orderBy('name')
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function updateUserRole(User $user, UserRole $role): User
    {
        $user->role = $role;
        $user->save();

        return $user->refresh()->loadCount('projects');
    }

    public function administratorCount(): int
    {
        return User::query()
            ->where('role', UserRole::Administrator)
            ->count();
    }

    public function mediaPathsOwnedBy(User $user): array
    {
        return Project::query()
            ->whereBelongsTo($user, 'owner')
            ->with('media:id,project_id,path,thumbnail')
            ->get()
            ->flatMap(
                fn (Project $project): Collection => $project->media->flatMap(
                    fn ($media): array => array_filter([
                        $media->path,
                        $media->thumbnail,
                    ]),
                ),
            )
            ->values()
            ->all();
    }

    public function deleteUser(User $user): void
    {
        $user->delete();
    }

    public function paginateProjectsForReview(
        array $filters,
        int $perPage,
    ): LengthAwarePaginator {
        $search = trim((string) ($filters['search'] ?? ''));

        return Project::query()
            ->with([
                'owner:id,name,email,institution',
                'category:id,name,description,icon',
                'reviewer:id,name',
            ])
            ->withCount(['favorites', 'votes', 'comments'])
            ->when(
                $filters['status'] ?? null,
                fn (Builder $query, mixed $status) => $query
                    ->where('status', $status),
                fn (Builder $query) => $query->whereIn('status', [
                    ProjectStatus::Submitted,
                    ProjectStatus::UnderReview,
                    ProjectStatus::Approved,
                    ProjectStatus::Published,
                ]),
            )
            ->when(
                $search !== '',
                function (Builder $query) use ($search): void {
                    $pattern = '%'.addcslashes($search, '\\%_').'%';

                    $query->where(function (Builder $query) use ($pattern): void {
                        $query
                            ->where('title', 'like', $pattern)
                            ->orWhere('team_name', 'like', $pattern)
                            ->orWhereHas(
                                'owner',
                                fn (Builder $query) => $query
                                    ->where('name', 'like', $pattern)
                                    ->orWhere('institution', 'like', $pattern),
                            );
                    });
                },
            )
            ->latest('updated_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function loadProjectForReview(Project $project): Project
    {
        return $project
            ->load(self::REVIEW_DETAILS)
            ->loadCount(['favorites', 'votes', 'comments']);
    }

    public function lockProject(Project $project): Project
    {
        return Project::query()
            ->lockForUpdate()
            ->findOrFail($project->getKey());
    }

    public function updateProject(Project $project, array $attributes): Project
    {
        $project->fill($attributes);
        $project->save();

        return $this->loadProjectForReview($project->refresh());
    }

    public function reports(): array
    {
        $projectStatuses = Project::query()
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');
        $userRoles = User::query()
            ->selectRaw('role, COUNT(*) as total')
            ->groupBy('role')
            ->pluck('total', 'role');
        $topVotedProjects = Project::query()
            ->publiclyVisible()
            ->with(['owner:id,name,institution', 'category:id,name'])
            ->withCount('votes')
            ->orderByDesc('votes_count')
            ->orderBy('title')
            ->limit(10)
            ->get();
        $highestVoteCount = (int) ($topVotedProjects->max('votes_count') ?? 0);

        return [
            'projects' => [
                'total' => Project::query()->count(),
                'by_status' => collect(ProjectStatus::cases())
                    ->mapWithKeys(fn (ProjectStatus $status): array => [
                        $status->value => (int) ($projectStatuses[$status->value] ?? 0),
                    ]),
                'by_category' => Category::query()
                    ->withCount('projects')
                    ->orderByDesc('projects_count')
                    ->orderBy('name')
                    ->get(),
                'by_sdg' => Sdg::query()
                    ->withCount('projects')
                    ->orderByRaw('CAST(code AS UNSIGNED)')
                    ->get(),
            ],
            'users' => [
                'total' => User::query()->count(),
                'by_role' => collect(UserRole::cases())
                    ->mapWithKeys(fn (UserRole $role): array => [
                        $role->value => (int) ($userRoles[$role->value] ?? 0),
                    ]),
                'institutions' => User::query()
                    ->selectRaw('institution, COUNT(*) as users_count')
                    ->whereNotNull('institution')
                    ->where('institution', '<>', '')
                    ->groupBy('institution')
                    ->orderByDesc('users_count')
                    ->orderBy('institution')
                    ->limit(20)
                    ->get(),
            ],
            'voting' => [
                'total_votes' => Vote::query()->count(),
                'top_projects' => $topVotedProjects,
                'people_choice_leaders' => $highestVoteCount === 0
                    ? collect()
                    : $topVotedProjects
                        ->where('votes_count', $highestVoteCount)
                        ->values(),
            ],
        ];
    }

    public function exhibitorAnalytics(
        User $exhibitor,
        int $perPage,
    ): array {
        $ownedProjects = Project::query()
            ->whereBelongsTo($exhibitor, 'owner');

        return [
            'summary' => [
                'projects' => (clone $ownedProjects)->count(),
                'views' => (int) (clone $ownedProjects)->sum('views_count'),
                'favorites' => Favorite::query()
                    ->whereHas(
                        'project',
                        fn (Builder $query) => $query
                            ->where('user_id', $exhibitor->getKey()),
                    )
                    ->count(),
                'votes' => Vote::query()
                    ->whereHas(
                        'project',
                        fn (Builder $query) => $query
                            ->where('user_id', $exhibitor->getKey()),
                    )
                    ->count(),
            ],
            'projects' => Project::query()
                ->whereBelongsTo($exhibitor, 'owner')
                ->with('category:id,name')
                ->withCount(['favorites', 'votes'])
                ->orderByDesc('views_count')
                ->orderBy('title')
                ->paginate($perPage)
                ->withQueryString(),
        ];
    }
}
