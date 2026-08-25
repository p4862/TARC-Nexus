<?php

namespace App\Repositories;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use App\Repositories\Contracts\ProjectRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class EloquentProjectRepository implements ProjectRepositoryInterface
{
    private const DETAILS = [
        'owner',
        'category',
        'members',
        'sdgs',
        'technologies',
        'media',
    ];

    private const PUBLIC_CARD_DETAILS = [
        'owner:id,name,institution',
        'category:id,name,description,icon',
        'sdgs:id,code,title,description',
        'previewMedia',
    ];

    private const PUBLIC_DETAILS = [
        'owner:id,name,institution',
        'category:id,name,description,icon',
        'members',
        'sdgs:id,code,title,description',
        'technologies:id,name',
        'media',
    ];

    public function paginateOwnedBy(
        User $owner,
        int $perPage,
        ?string $status = null,
    ): LengthAwarePaginator {
        return Project::query()
            ->whereBelongsTo($owner, 'owner')
            ->when(
                $status,
                fn (Builder $query, string $status) => $query
                    ->where('status', $status),
            )
            ->with(self::DETAILS)
            ->latest('updated_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function paginatePublished(
        array $filters,
        int $perPage,
        ?User $viewer = null,
    ): LengthAwarePaginator {
        $query = $this->publishedCardsQuery($viewer);

        $this->applySearch($query, $filters['search'] ?? null);

        $query
            ->when(
                $filters['category_id'] ?? null,
                fn (Builder $query, mixed $categoryId) => $query
                    ->where('category_id', $categoryId),
            )
            ->when(
                $filters['sdg_id'] ?? null,
                fn (Builder $query, mixed $sdgId) => $query
                    ->whereHas(
                        'sdgs',
                        fn (Builder $query) => $query->whereKey($sdgId),
                    ),
            )
            ->when(
                $filters['technology_id'] ?? null,
                fn (Builder $query, mixed $technologyId) => $query
                    ->whereHas(
                        'technologies',
                        fn (Builder $query) => $query->whereKey($technologyId),
                    ),
            )
            ->when(
                $filters['year'] ?? null,
                fn (Builder $query, mixed $year) => $query
                    ->whereYear('published_at', $year),
            )
            ->when(
                array_key_exists('featured', $filters),
                fn (Builder $query) => $query
                    ->where('featured', (bool) $filters['featured']),
            );

        $this->applySort($query, (string) ($filters['sort'] ?? 'recent'));

        return $query
            ->paginate($perPage)
            ->withQueryString();
    }

    public function paginateFavoritedBy(
        User $user,
        int $perPage,
    ): LengthAwarePaginator {
        return $this->publishedCardsQuery($user)
            ->whereHas(
                'favorites',
                fn (Builder $query) => $query
                    ->where('user_id', $user->getKey()),
            )
            ->withMax(
                [
                    'favorites as favorited_at' => fn (Builder $query) => $query
                        ->where('user_id', $user->getKey()),
                ],
                'created_at',
            )
            ->latest('favorited_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function featuredPublished(
        int $limit,
        ?User $viewer = null,
    ): Collection {
        return $this->publishedCardsQuery($viewer)
            ->where('featured', true)
            ->latest('published_at')
            ->limit($limit)
            ->get();
    }

    public function newestPublished(
        int $limit,
        ?User $viewer = null,
    ): Collection {
        return $this->publishedCardsQuery($viewer)
            ->latest('published_at')
            ->latest('id')
            ->limit($limit)
            ->get();
    }

    public function popularPublished(
        int $limit,
        ?User $viewer = null,
    ): Collection {
        return $this->publishedCardsQuery($viewer)
            ->orderByRaw(
                '(views_count + favorites_count + votes_count) DESC',
            )
            ->latest('published_at')
            ->limit($limit)
            ->get();
    }

    public function publicStatistics(): array
    {
        $publishedProjects = Project::query()->publiclyVisible();

        return [
            'projects' => (clone $publishedProjects)->count(),
            'students' => ProjectMember::query()
                ->whereHas(
                    'project',
                    fn (Builder $query) => $query->publiclyVisible(),
                )
                ->distinct()
                ->count('matric_number'),
            'institutions' => User::query()
                ->whereNotNull('institution')
                ->where('institution', '<>', '')
                ->whereHas(
                    'projects',
                    fn (Builder $query) => $query->publiclyVisible(),
                )
                ->distinct()
                ->count('institution'),
        ];
    }

    public function create(array $attributes): Project
    {
        return Project::query()->create($attributes);
    }

    public function update(Project $project, array $attributes): Project
    {
        $project->fill($attributes);
        $project->save();

        return $project->refresh();
    }

    public function replaceMembers(Project $project, array $members): void
    {
        $project->members()->delete();
        $project->members()->createMany($members);
    }

    public function syncSdgs(Project $project, array $sdgs): void
    {
        $project->sdgs()->sync($sdgs);
    }

    public function syncTechnologies(Project $project, array $technologyIds): void
    {
        $project->technologies()->sync($technologyIds);
    }

    public function loadDetails(Project $project): Project
    {
        return $project->load(self::DETAILS);
    }

    public function loadPublicDetails(
        Project $project,
        ?User $viewer = null,
    ): Project {
        $project->load(self::PUBLIC_DETAILS)->loadCount([
            'favorites',
            'votes',
            'comments',
        ]);

        $this->setViewerState($project, $viewer);

        return $project;
    }

    public function incrementViews(Project $project): void
    {
        $project->increment('views_count');
        $project->refresh();
    }

    public function slugExists(string $slug, ?int $exceptProjectId = null): bool
    {
        return Project::query()
            ->where('slug', $slug)
            ->when(
                $exceptProjectId !== null,
                fn ($query) => $query->whereKeyNot($exceptProjectId),
            )
            ->exists();
    }

    public function delete(Project $project): void
    {
        $project->delete();
    }

    /**
     * @return Builder<Project>
     */
    private function publishedCardsQuery(?User $viewer = null): Builder
    {
        $query = Project::query()
            ->publiclyVisible()
            ->with(self::PUBLIC_CARD_DETAILS)
            ->withCount([
                'favorites',
                'votes',
                'comments',
            ]);

        if ($viewer !== null) {
            $query->withExists([
                'favorites as is_favorited' => fn (Builder $query) => $query
                    ->where('user_id', $viewer->getKey()),
                'votes as has_voted' => fn (Builder $query) => $query
                    ->where('user_id', $viewer->getKey()),
            ]);
        }

        return $query;
    }

    /**
     * @param  Builder<Project>  $query
     */
    private function applySearch(Builder $query, mixed $search): void
    {
        $term = trim((string) $search);

        if ($term === '') {
            return;
        }

        $pattern = '%'.addcslashes($term, '\\%_').'%';

        $query->where(function (Builder $query) use ($pattern): void {
            $query
                ->where('title', 'like', $pattern)
                ->orWhere('subtitle', 'like', $pattern)
                ->orWhere('team_name', 'like', $pattern)
                ->orWhere('abstract', 'like', $pattern)
                ->orWhere('problem_statement', 'like', $pattern)
                ->orWhere('proposed_solution', 'like', $pattern)
                ->orWhere('objectives', 'like', $pattern)
                ->orWhere('target_users', 'like', $pattern)
                ->orWhere('expected_impact', 'like', $pattern)
                ->orWhereHas(
                    'owner',
                    fn (Builder $query) => $query
                        ->where('name', 'like', $pattern)
                        ->orWhere('institution', 'like', $pattern),
                )
                ->orWhereHas(
                    'members',
                    fn (Builder $query) => $query
                        ->where('student_name', 'like', $pattern)
                        ->orWhere('programme', 'like', $pattern)
                        ->orWhere('supervisor', 'like', $pattern),
                )
                ->orWhereHas(
                    'category',
                    fn (Builder $query) => $query->where('name', 'like', $pattern),
                )
                ->orWhereHas(
                    'technologies',
                    fn (Builder $query) => $query->where('name', 'like', $pattern),
                )
                ->orWhereHas(
                    'sdgs',
                    fn (Builder $query) => $query
                        ->where('code', 'like', $pattern)
                        ->orWhere('title', 'like', $pattern),
                );
        });
    }

    /**
     * @param  Builder<Project>  $query
     */
    private function applySort(Builder $query, string $sort): void
    {
        match ($sort) {
            'alphabetical' => $query
                ->orderBy('title')
                ->orderBy('id'),
            'popular', 'viewed' => $query
                ->when(
                    $sort === 'popular',
                    fn (Builder $query) => $query->orderByRaw(
                        '(views_count + favorites_count + votes_count) DESC',
                    ),
                    fn (Builder $query) => $query->orderByDesc('views_count'),
                )
                ->latest('published_at')
                ->latest('id'),
            default => $query
                ->latest('published_at')
                ->latest('id'),
        };
    }

    private function setViewerState(
        Project $project,
        ?User $viewer,
    ): void {
        $project->setAttribute(
            'is_favorited',
            $viewer !== null
                && $project->favorites()
                    ->where('user_id', $viewer->getKey())
                    ->exists(),
        );
        $project->setAttribute(
            'has_voted',
            $viewer !== null
                && $project->votes()
                    ->where('user_id', $viewer->getKey())
                    ->exists(),
        );
    }
}
