<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectEngagementResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'project_id' => $this->getKey(),
            'is_favorited' => (bool) $this->is_favorited,
            'has_voted' => (bool) $this->has_voted,
            'favorites_count' => (int) $this->favorites_count,
            'votes_count' => (int) $this->votes_count,
            'comments_count' => (int) $this->comments_count,
        ];
    }
}
