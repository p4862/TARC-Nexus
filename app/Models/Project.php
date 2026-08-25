<?php

namespace App\Models;

use App\Enums\MediaType;
use App\Enums\ProjectStatus;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'subtitle',
        'team_name',
        'slug',
        'abstract',
        'problem_statement',
        'proposed_solution',
        'objectives',
        'target_users',
        'expected_impact',
        'methodology',
        'system_architecture',
        'github_url',
        'demo_url',
        'figma_url',
        'video_url',
        'status',
        'review_notes',
        'reviewed_by',
        'reviewed_at',
        'featured',
        'views_count',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => ProjectStatus::class,
            'featured' => 'boolean',
            'views_count' => 'integer',
            'reviewed_at' => 'datetime',
            'published_at' => 'datetime',
        ];
    }

    /**
     * @param  Builder<Project>  $query
     * @return Builder<Project>
     */
    public function scopePubliclyVisible(Builder $query): Builder
    {
        return $query
            ->where('status', ProjectStatus::Published)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function isPubliclyVisible(): bool
    {
        return $this->status === ProjectStatus::Published
            && $this->published_at !== null
            && ! $this->published_at->isFuture();
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function members(): HasMany
    {
        return $this->hasMany(ProjectMember::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function previewMedia(): HasOne
    {
        return $this->hasOne(Media::class)
            ->whereIn('type', [
                MediaType::Image->value,
                MediaType::Poster->value,
            ])
            ->oldestOfMany();
    }

    public function sdgs(): BelongsToMany
    {
        return $this->belongsToMany(Sdg::class, 'project_sdgs')
            ->withPivot('contribution_description');
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'project_technologies');
    }
}
