<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminDashboardResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'statistics' => [
                'total_projects' => $this->resource['total_projects'],
                'total_exhibitors' => $this->resource['total_exhibitors'],
                'total_guests' => $this->resource['total_guests'],
                'published_projects' => $this->resource['published_projects'],
                'pending_approvals' => $this->resource['pending_approvals'],
            ],
            'popular_categories' => $this->resource['popular_categories']
                ->map(fn ($category): array => [
                    'id' => $category->getKey(),
                    'name' => $category->name,
                    'projects_count' => (int) $category
                        ->published_projects_count,
                ])
                ->values(),
            'recent_submissions' => AdminProjectResource::collection(
                $this->resource['recent_submissions'],
            ),
        ];
    }
}
