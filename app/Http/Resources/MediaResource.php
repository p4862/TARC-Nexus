<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MediaResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $disk = (string) config('project_media.disk');

        return [
            'id' => $this->getKey(),
            'type' => $this->type->value,
            'filename' => $this->filename,
            'url' => Storage::disk($disk)->url($this->path),
            'thumbnail_url' => $this->thumbnail === null
                ? null
                : Storage::disk($disk)->url($this->thumbnail),
            'uploaded_at' => $this->uploaded_at?->toIso8601String(),
        ];
    }
}
