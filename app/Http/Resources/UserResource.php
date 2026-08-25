<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $avatarDisk = (string) config('authentication.avatar.disk');

        return [
            'id' => $this->getKey(),
            'name' => $this->name,
            'email' => $this->email,
            'avatar_url' => $this->avatar === null
                ? null
                : Storage::disk($avatarDisk)->url($this->avatar),
            'biography' => $this->biography,
            'institution' => $this->institution,
            'role' => $this->role->value,
            'email_verified_at' => $this->email_verified_at?->toIso8601String(),
            'has_password' => $this->password !== null,
            'google_connected' => $this->google_id !== null,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
