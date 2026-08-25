<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Project;
use App\Models\Sdg;
use App\Models\Technology;
use App\Models\User;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use App\Repositories\Contracts\ProjectRepositoryInterface;
use App\Repositories\Contracts\TaxonomyRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PublicExhibitionService
{
    public function __construct(
        private readonly ProjectRepositoryInterface $projects,
        private readonly TaxonomyRepositoryInterface $taxonomies,
        private readonly AnnouncementRepositoryInterface $announcements,
    ) {}

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, Project>
     */
    public function gallery(
        array $filters,
        ?User $viewer = null,
    ): LengthAwarePaginator {
        return $this->projects->paginatePublished(
            $filters,
            (int) ($filters['per_page'] ?? 12),
            $viewer,
        );
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, Project>
     */
    public function category(
        Category $category,
        array $filters,
        ?User $viewer = null,
    ): LengthAwarePaginator {
        return $this->gallery([
            ...$filters,
            'category_id' => $category->getKey(),
        ], $viewer);
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, Project>
     */
    public function sdg(
        Sdg $sdg,
        array $filters,
        ?User $viewer = null,
    ): LengthAwarePaginator {
        return $this->gallery([
            ...$filters,
            'sdg_id' => $sdg->getKey(),
        ], $viewer);
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<int, Project>
     */
    public function technology(
        Technology $technology,
        array $filters,
        ?User $viewer = null,
    ): LengthAwarePaginator {
        return $this->gallery([
            ...$filters,
            'technology_id' => $technology->getKey(),
        ], $viewer);
    }

    public function project(
        Project $project,
        ?User $viewer = null,
    ): Project {
        if (! $project->isPubliclyVisible()) {
            throw (new ModelNotFoundException)->setModel(
                Project::class,
                [$project->getKey()],
            );
        }

        $this->projects->incrementViews($project);

        return $this->projects->loadPublicDetails($project, $viewer);
    }

    /**
     * @return array<string, mixed>
     */
    public function homepage(?User $viewer = null): array
    {
        return [
            'statistics' => $this->projects->publicStatistics(),
            'featured_projects' => $this->projects
                ->featuredPublished(3, $viewer),
            'newest_projects' => $this->projects
                ->newestPublished(6, $viewer),
            'popular_projects' => $this->projects
                ->popularPublished(6, $viewer),
            'taxonomies' => $this->taxonomies->publicDiscovery(),
            'announcements' => $this->announcements->published(3),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function taxonomies(): array
    {
        return $this->taxonomies->publicDiscovery();
    }
}
