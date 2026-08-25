<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CommentResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $avatarDisk = (string) config('authentication.avatar.disk');

        return [
            'id' => $this->getKey(),
            'parent_id' => $this->parent_id,
            'comment' => $this->comment,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'author' => $this->whenLoaded('author', fn (): array => [
                'id' => $this->author->getKey(),
                'name' => $this->author->name,
                'role' => $this->author->role->value,
                'avatar_url' => $this->author->avatar === null
                    ? null
                    : Storage::disk($avatarDisk)->url($this->author->avatar),
            ]),
            'replies' => CommentResource::collection(
                $this->whenLoaded('replies'),
            ),
        ];
    }
}
