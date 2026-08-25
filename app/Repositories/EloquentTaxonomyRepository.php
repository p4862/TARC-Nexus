<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\Sdg;
use App\Models\Technology;
use App\Repositories\Contracts\TaxonomyRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class EloquentTaxonomyRepository implements TaxonomyRepositoryInterface
{
    public function categories(): Collection
    {
        return Category::query()
            ->orderBy('name')
            ->get();
    }

    public function sdgs(): Collection
    {
        return Sdg::query()
            ->orderByRaw('CAST(code AS UNSIGNED)')
            ->get();
    }

    public function technologies(): Collection
    {
        return Technology::query()
            ->orderBy('name')
            ->get();
    }

    public function publicDiscovery(): array
    {
        $publishedCount = fn (Builder $query) => $query->publiclyVisible();

        return [
            'categories' => Category::query()
                ->withCount(['projects as published_projects_count' => $publishedCount])
                ->orderBy('name')
                ->get(),
            'sdgs' => Sdg::query()
                ->withCount(['projects as published_projects_count' => $publishedCount])
                ->orderByRaw('CAST(code AS UNSIGNED)')
                ->get(),
            'technologies' => Technology::query()
                ->withCount(['projects as published_projects_count' => $publishedCount])
                ->orderBy('name')
                ->get(),
        ];
    }

    public function managed(): array
    {
        return [
            'categories' => Category::query()
                ->withCount('projects')
                ->orderBy('name')
                ->get(),
            'sdgs' => Sdg::query()
                ->withCount('projects')
                ->orderByRaw('CAST(code AS UNSIGNED)')
                ->get(),
            'technologies' => Technology::query()
                ->withCount('projects')
                ->orderBy('name')
                ->get(),
        ];
    }

    public function createCategory(array $attributes): Category
    {
        return Category::query()->create($attributes);
    }

    public function updateCategory(
        Category $category,
        array $attributes,
    ): Category {
        $category->fill($attributes);
        $category->save();

        return $category->refresh();
    }

    public function deleteCategory(Category $category): void
    {
        $category->delete();
    }

    public function categoryIsInUse(Category $category): bool
    {
        return $category->projects()->exists();
    }

    public function createTechnology(array $attributes): Technology
    {
        return Technology::query()->create($attributes);
    }

    public function updateTechnology(
        Technology $technology,
        array $attributes,
    ): Technology {
        $technology->fill($attributes);
        $technology->save();

        return $technology->refresh();
    }

    public function deleteTechnology(Technology $technology): void
    {
        $technology->delete();
    }

    public function technologyIsInUse(Technology $technology): bool
    {
        return $technology->projects()->exists();
    }

    public function createSdg(array $attributes): Sdg
    {
        return Sdg::query()->create($attributes);
    }

    public function updateSdg(Sdg $sdg, array $attributes): Sdg
    {
        $sdg->fill($attributes);
        $sdg->save();

        return $sdg->refresh();
    }

    public function deleteSdg(Sdg $sdg): void
    {
        $sdg->delete();
    }

    public function sdgIsInUse(Sdg $sdg): bool
    {
        return $sdg->projects()->exists();
    }
}
