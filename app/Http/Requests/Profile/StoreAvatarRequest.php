<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Dimensions;
use Illuminate\Validation\Rules\File;

class StoreAvatarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return [
            'avatar' => [
                'required',
                'image',
                File::types(config('authentication.avatar.allowed_mime_types'))
                    ->extensions(['jpg', 'jpeg', 'png', 'webp'])
                    ->max(config('authentication.avatar.max_kilobytes')),
                (new Dimensions)
                    ->minWidth(config('authentication.avatar.minimum_dimension'))
                    ->minHeight(config('authentication.avatar.minimum_dimension'))
                    ->maxWidth(config('authentication.avatar.maximum_dimension'))
                    ->maxHeight(config('authentication.avatar.maximum_dimension')),
            ],
        ];
    }
}
