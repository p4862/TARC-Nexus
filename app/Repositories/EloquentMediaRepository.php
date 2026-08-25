<?php

namespace App\Repositories;

use App\Models\Media;
use App\Models\Project;
use App\Repositories\Contracts\MediaRepositoryInterface;

class EloquentMediaRepository implements MediaRepositoryInterface
{
    public function create(Project $project, array $attributes): Media
    {
        return $project->media()->create($attributes);
    }

    public function delete(Media $media): void
    {
        $media->delete();
    }
}
