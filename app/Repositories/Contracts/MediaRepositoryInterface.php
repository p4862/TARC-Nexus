<?php

namespace App\Repositories\Contracts;

use App\Models\Media;
use App\Models\Project;

interface MediaRepositoryInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(Project $project, array $attributes): Media;

    public function delete(Media $media): void;
}
