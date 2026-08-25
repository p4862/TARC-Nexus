<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sdg extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'code',
        'title',
        'description',
    ];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_sdgs')
            ->withPivot('contribution_description');
    }
}
