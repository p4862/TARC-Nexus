<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExhibitorAnalyticsResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $paginator = $this->resource['projects'];

        return [
            'summary' => $this->resource['summary'],
            'projects' => collect($paginator->items())->map(
                fn ($project): array => [
                    'id' => $project->getKey(),
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'status' => $project->status->value,
                    'views_count' => $project->views_count,
                    'favorites_count' => (int) $project->favorites_count,
                    'votes_count' => (int) $project->votes_count,
                    'published_at' => $project->published_at?->toIso8601String(),
                    'category' => [
                        'id' => $project->category->getKey(),
                        'name' => $project->category->name,
                    ],
                ],
            )->values(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ];
    }
}
