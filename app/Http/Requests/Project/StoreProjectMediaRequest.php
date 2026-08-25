<?php

namespace App\Http\Requests\Project;

use App\Enums\MediaType;
use App\Rules\SafeRasterImage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class StoreProjectMediaRequest extends FormRequest
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
        $type = MediaType::tryFrom((string) $this->input('type'));
        $configuration = $type === null
            ? []
            : (array) config("project_media.types.{$type->value}", []);
        $extensions = (array) ($configuration['extensions'] ?? []);
        $mimeTypes = (array) ($configuration['mime_types'] ?? []);
        $maxKilobytes = (int) ($configuration['max_kilobytes'] ?? 1);

        $fileRules = [
            'required',
            File::types($mimeTypes)
                ->extensions($extensions)
                ->max($maxKilobytes),
        ];

        if ($type === MediaType::Image) {
            $fileRules[] = 'image';
        }

        if (in_array($type, [MediaType::Image, MediaType::Poster], true)) {
            $fileRules[] = new SafeRasterImage(
                (int) ($configuration['max_width'] ?? 1),
                (int) ($configuration['max_height'] ?? 1),
                (int) ($configuration['max_pixels'] ?? 1),
            );
        }

        return [
            'type' => ['required', Rule::enum(MediaType::class)],
            'file' => $fileRules,
        ];
    }
}
