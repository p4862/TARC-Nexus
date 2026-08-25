<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;
use Illuminate\Translation\PotentiallyTranslatedString;

class SafeRasterImage implements ValidationRule
{
    public function __construct(
        private readonly int $maximumWidth,
        private readonly int $maximumHeight,
        private readonly int $maximumPixels,
    ) {}

    /**
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! $value instanceof UploadedFile
            || ! str_starts_with((string) $value->getMimeType(), 'image/')) {
            return;
        }

        $dimensions = @getimagesize((string) $value->getRealPath());

        if ($dimensions === false) {
            $fail('The :attribute must be a valid raster image.');

            return;
        }

        [$width, $height] = $dimensions;

        if ($width > $this->maximumWidth
            || $height > $this->maximumHeight
            || ($width * $height) > $this->maximumPixels) {
            $fail(
                "The :attribute dimensions must not exceed {$this->maximumWidth}×{$this->maximumHeight} pixels or {$this->maximumPixels} total pixels."
            );
        }
    }
}
