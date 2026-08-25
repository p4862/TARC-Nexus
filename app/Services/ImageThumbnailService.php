<?php

namespace App\Services;

use GdImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class ImageThumbnailService
{
    public function create(
        UploadedFile $file,
        string $originalPath,
        string $disk,
    ): ?string {
        if (! str_starts_with((string) $file->getMimeType(), 'image/')) {
            return null;
        }

        $contents = file_get_contents((string) $file->getRealPath());
        $source = $contents === false ? false : @imagecreatefromstring($contents);

        if (! $source instanceof GdImage) {
            throw new RuntimeException('The uploaded image could not be processed.');
        }

        $thumbnail = null;
        $temporary = null;

        try {
            $source = $this->orient($source, $file);
            $thumbnail = $this->resize($source);
            $temporary = tmpfile();

            if ($temporary === false
                || ! imagewebp(
                    $thumbnail,
                    $temporary,
                    (int) config('project_media.thumbnail.quality'),
                )) {
                throw new RuntimeException('The image thumbnail could not be encoded.');
            }

            rewind($temporary);
            $thumbnailPath = $this->thumbnailPath($originalPath);

            if (! Storage::disk($disk)->put($thumbnailPath, $temporary)) {
                throw new RuntimeException('The image thumbnail could not be stored.');
            }

            return $thumbnailPath;
        } finally {
            if (is_resource($temporary)) {
                fclose($temporary);
            }

            if ($thumbnail instanceof GdImage) {
                imagedestroy($thumbnail);
            }

            if ($source instanceof GdImage) {
                imagedestroy($source);
            }
        }
    }

    private function resize(GdImage $source): GdImage
    {
        $sourceWidth = imagesx($source);
        $sourceHeight = imagesy($source);
        $scale = min(
            (int) config('project_media.thumbnail.max_width') / $sourceWidth,
            (int) config('project_media.thumbnail.max_height') / $sourceHeight,
            1,
        );
        $width = max(1, (int) round($sourceWidth * $scale));
        $height = max(1, (int) round($sourceHeight * $scale));
        $thumbnail = imagecreatetruecolor($width, $height);

        if (! $thumbnail instanceof GdImage) {
            throw new RuntimeException('The image thumbnail could not be created.');
        }

        imagealphablending($thumbnail, false);
        imagesavealpha($thumbnail, true);
        $transparent = imagecolorallocatealpha($thumbnail, 0, 0, 0, 127);
        imagefilledrectangle($thumbnail, 0, 0, $width, $height, $transparent);

        if (! imagecopyresampled(
            $thumbnail,
            $source,
            0,
            0,
            0,
            0,
            $width,
            $height,
            $sourceWidth,
            $sourceHeight,
        )) {
            imagedestroy($thumbnail);

            throw new RuntimeException('The image thumbnail could not be resized.');
        }

        return $thumbnail;
    }

    private function orient(GdImage $source, UploadedFile $file): GdImage
    {
        if ($file->getMimeType() !== 'image/jpeg'
            || ! function_exists('exif_read_data')) {
            return $source;
        }

        $metadata = @exif_read_data(
            (string) $file->getRealPath(),
            'IFD0',
            true,
        );
        $orientation = (int) ($metadata['IFD0']['Orientation'] ?? 1);

        if (in_array($orientation, [2, 4, 5, 7], true)) {
            imageflip(
                $source,
                in_array($orientation, [2, 5], true)
                    ? IMG_FLIP_HORIZONTAL
                    : IMG_FLIP_VERTICAL,
            );
        }

        $angle = match ($orientation) {
            3, 4 => 180,
            5, 6 => -90,
            7, 8 => 90,
            default => 0,
        };

        if ($angle === 0) {
            return $source;
        }

        $oriented = imagerotate($source, $angle, 0);

        if (! $oriented instanceof GdImage) {
            throw new RuntimeException('The uploaded image orientation could not be applied.');
        }

        imagedestroy($source);

        return $oriented;
    }

    private function thumbnailPath(string $originalPath): string
    {
        $directory = pathinfo($originalPath, PATHINFO_DIRNAME);
        $filename = pathinfo($originalPath, PATHINFO_FILENAME);

        return "{$directory}/thumbnails/{$filename}.webp";
    }
}
