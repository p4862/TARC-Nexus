<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'team_name' => $this->team_name,
            'slug' => $this->slug,
            'abstract' => $this->abstract,
            'problem_statement' => $this->problem_statement,
            'proposed_solution' => $this->proposed_solution,
            'objectives' => $this->objectives,
            'target_users' => $this->target_users,
            'expected_impact' => $this->expected_impact,
            'methodology' => $this->methodology,
            'system_architecture' => $this->system_architecture,
            'github_url' => $this->github_url,
            'demo_url' => $this->demo_url,
            'figma_url' => $this->figma_url,
            'video_url' => $this->video_url,
            'status' => $this->status->value,
            'review_notes' => $this->review_notes,
            'featured' => $this->featured,
            'views_count' => $this->views_count,
            'favorites_count' => (int) ($this->favorites_count ?? 0),
            'votes_count' => (int) ($this->votes_count ?? 0),
            'comments_count' => (int) ($this->comments_count ?? 0),
            'reviewed_at' => $this->reviewed_at?->toIso8601String(),
            'published_at' => $this->published_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'owner' => $this->whenLoaded('owner', fn (): array => [
                'id' => $this->owner->getKey(),
                'name' => $this->owner->name,
                'email' => $this->owner->email,
                'institution' => $this->owner->institution,
            ]),
            'reviewer' => $this->whenLoaded(
                'reviewer',
                fn (): ?array => $this->reviewer === null
                    ? null
                    : [
                        'id' => $this->reviewer->getKey(),
                        'name' => $this->reviewer->name,
                    ],
            ),
            'category' => $this->whenLoaded('category', fn (): array => [
                'id' => $this->category->getKey(),
                'name' => $this->category->name,
                'description' => $this->category->description,
                'icon' => $this->category->icon,
            ]),
            'members' => $this->whenLoaded(
                'members',
                fn () => $this->members->map(fn ($member): array => [
                    'id' => $member->getKey(),
                    'student_name' => $member->student_name,
                    'matric_number' => $member->matric_number,
                    'programme' => $member->programme,
                    'supervisor' => $member->supervisor,
                ])->values(),
            ),
            'sdgs' => $this->whenLoaded(
                'sdgs',
                fn () => $this->sdgs->map(fn ($sdg): array => [
                    'id' => $sdg->getKey(),
                    'code' => $sdg->code,
                    'title' => $sdg->title,
                    'description' => $sdg->description,
                    'contribution_description' => $sdg->pivot
                        ->contribution_description,
                ])->values(),
            ),
            'technologies' => $this->whenLoaded(
                'technologies',
                fn () => $this->technologies->map(fn ($technology): array => [
                    'id' => $technology->getKey(),
                    'name' => $technology->name,
                ])->values(),
            ),
            'media' => MediaResource::collection($this->whenLoaded('media')),
        ];
    }
}
