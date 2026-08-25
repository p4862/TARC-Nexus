<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminReportsResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $projects = $this->resource['projects'];
        $users = $this->resource['users'];
        $voting = $this->resource['voting'];

        return [
            'projects' => [
                'total' => $projects['total'],
                'by_status' => $projects['by_status'],
                'by_category' => $projects['by_category']->map(
                    fn ($category): array => [
                        'id' => $category->getKey(),
                        'name' => $category->name,
                        'projects_count' => (int) $category->projects_count,
                    ],
                )->values(),
                'by_sdg' => $projects['by_sdg']->map(fn ($sdg): array => [
                    'id' => $sdg->getKey(),
                    'code' => $sdg->code,
                    'title' => $sdg->title,
                    'projects_count' => (int) $sdg->projects_count,
                ])->values(),
            ],
            'users' => [
                'total' => $users['total'],
                'by_role' => $users['by_role'],
                'institutions' => $users['institutions']->map(
                    fn ($institution): array => [
                        'name' => $institution->institution,
                        'users_count' => (int) $institution->users_count,
                    ],
                )->values(),
            ],
            'voting' => [
                'total_votes' => $voting['total_votes'],
                'top_projects' => $this->votingProjects(
                    $voting['top_projects'],
                ),
                'people_choice_leaders' => $this->votingProjects(
                    $voting['people_choice_leaders'],
                ),
            ],
        ];
    }

    private function votingProjects($projects)
    {
        return $projects->map(fn ($project): array => [
            'id' => $project->getKey(),
            'title' => $project->title,
            'slug' => $project->slug,
            'votes_count' => (int) $project->votes_count,
            'owner' => [
                'name' => $project->owner->name,
                'institution' => $project->owner->institution,
            ],
            'category' => [
                'id' => $project->category->getKey(),
                'name' => $project->category->name,
            ],
        ])->values();
    }
}
