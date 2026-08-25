<?php

namespace App\Repositories\Contracts;

use App\Models\Category;
use App\Models\Sdg;
use App\Models\Technology;
use Illuminate\Support\Collection;

interface TaxonomyRepositoryInterface
{
    /**
     * @return Collection<int, Category>
     */
    public function categories(): Collection;

    /**
     * @return Collection<int, Sdg>
     */
    public function sdgs(): Collection;

    /**
     * @return Collection<int, Technology>
     */
    public function technologies(): Collection;

    /**
     * @return array{
     *     categories: Collection<int, Category>,
     *     sdgs: Collection<int, Sdg>,
     *     technologies: Collection<int, Technology>
     * }
     */
    public function publicDiscovery(): array;

    /**
     * @return array{
     *     categories: Collection<int, Category>,
     *     sdgs: Collection<int, Sdg>,
     *     technologies: Collection<int, Technology>
     * }
     */
    public function managed(): array;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function createCategory(array $attributes): Category;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateCategory(
        Category $category,
        array $attributes,
    ): Category;

    public function deleteCategory(Category $category): void;

    public function categoryIsInUse(Category $category): bool;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function createTechnology(array $attributes): Technology;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateTechnology(
        Technology $technology,
        array $attributes,
    ): Technology;

    public function deleteTechnology(Technology $technology): void;

    public function technologyIsInUse(Technology $technology): bool;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function createSdg(array $attributes): Sdg;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateSdg(Sdg $sdg, array $attributes): Sdg;

    public function deleteSdg(Sdg $sdg): void;

    public function sdgIsInUse(Sdg $sdg): bool;
}
