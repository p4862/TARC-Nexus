<?php

namespace App\Services;

use App\Enums\MediaType;
use App\Models\Media;
use App\Models\Project;
use App\Repositories\Contracts\MediaRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class ProjectMediaService
{
    public function __construct(
        private readonly MediaRepositoryInterface $media,
        private readonly ProjectService $projects,
        private readonly ImageThumbnailService $thumbnails,
    ) {}

    public function store(
        Project $project,
        MediaType $type,
        UploadedFile $file,
    ): Media {
        $this->projects->ensureDraft($project);

        $disk = (string) config('project_media.disk');
        $baseDirectory = trim(
            (string) config('project_media.directory'),
            '/'
        );
        $directory = "{$baseDirectory}/{$project->getKey()}/{$type->value}";
        $path = $file->store($directory, $disk);

        if ($path === false) {
            throw new RuntimeException('The project media could not be stored.');
        }

        $thumbnail = null;

        try {
            if (in_array($type, [MediaType::Image, MediaType::Poster], true)) {
                $thumbnail = $this->thumbnails->create($file, $path, $disk);
            }

            return $this->media->create($project, [
                'type' => $type,
                'filename' => Str::limit(
                    basename($file->getClientOriginalName()),
                    255,
                    '',
                ),
                'path' => $path,
                'thumbnail' => $thumbnail,
                'uploaded_at' => now(),
            ]);
        } catch (Throwable $exception) {
            Storage::disk($disk)->delete(array_filter([
                $path,
                $thumbnail,
            ]));

            throw $exception;
        }
    }

    public function delete(Project $project, Media $media): void
    {
        $this->projects->ensureDraft($project);

        if (! $media->project()->whereKey($project->getKey())->exists()) {
            abort(404);
        }

        $disk = (string) config('project_media.disk');

        if (Storage::disk($disk)->exists($media->path)
            && ! Storage::disk($disk)->delete($media->path)) {
            throw new RuntimeException('The project media could not be removed.');
        }

        if ($media->thumbnail !== null) {
            Storage::disk($disk)->delete($media->thumbnail);
        }

        $this->media->delete($media);
    }
}
