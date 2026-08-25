<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectCardResource extends JsonResource
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
            'featured' => $this->featured,
            'views_count' => $this->views_count,
            'favorites_count' => (int) ($this->favorites_count ?? 0),
            'votes_count' => (int) ($this->votes_count ?? 0),
            'comments_count' => (int) ($this->comments_count ?? 0),
            'is_favorited' => (bool) ($this->is_favorited ?? false),
            'has_voted' => (bool) ($this->has_voted ?? false),
            'published_at' => $this->published_at?->toIso8601String(),
            'owner' => $this->whenLoaded('owner', fn (): array => [
                'id' => $this->owner->getKey(),
                'name' => $this->owner->name,
                'institution' => $this->owner->institution,
            ]),
            'category' => $this->whenLoaded('category', fn (): array => [
                'id' => $this->category->getKey(),
                'name' => $this->category->name,
                'description' => $this->category->description,
                'icon' => $this->category->icon,
            ]),
            'sdgs' => $this->whenLoaded(
                'sdgs',
                fn () => $this->sdgs->map(fn ($sdg): array => [
                    'id' => $sdg->getKey(),
                    'code' => $sdg->code,
                    'title' => $sdg->title,
                ])->values(),
            ),
            'preview_media' => new MediaResource(
                $this->whenLoaded('previewMedia'),
            ),
        ];
    }
}
