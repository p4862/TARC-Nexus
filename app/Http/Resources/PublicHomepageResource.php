<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicHomepageResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'statistics' => $this->resource['statistics'],
            'featured_projects' => ProjectCardResource::collection(
                $this->resource['featured_projects'],
            ),
            'newest_projects' => ProjectCardResource::collection(
                $this->resource['newest_projects'],
            ),
            'popular_projects' => ProjectCardResource::collection(
                $this->resource['popular_projects'],
            ),
            'categories' => $this->resource['taxonomies']['categories']->map(
                fn ($category): array => [
                    'id' => $category->getKey(),
                    'name' => $category->name,
                    'description' => $category->description,
                    'icon' => $category->icon,
                    'projects_count' => $category->published_projects_count,
                ],
            )->values(),
            'sdgs' => $this->resource['taxonomies']['sdgs']->map(
                fn ($sdg): array => [
                    'id' => $sdg->getKey(),
                    'code' => $sdg->code,
                    'title' => $sdg->title,
                    'description' => $sdg->description,
                    'projects_count' => $sdg->published_projects_count,
                ],
            )->values(),
            'announcements' => AnnouncementResource::collection(
                $this->resource['announcements'],
            ),
        ];
    }
}
