<?php

namespace App\Services;

use App\Exceptions\AdministrationConflictException;
use App\Models\Category;
use App\Models\Sdg;
use App\Models\Technology;
use App\Repositories\Contracts\TaxonomyRepositoryInterface;

class TaxonomyManagementService
{
    public function __construct(
        private readonly TaxonomyRepositoryInterface $taxonomies,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function index(): array
    {
        return $this->taxonomies->managed();
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function createCategory(array $attributes): Category
    {
        return $this->taxonomies->createCategory($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateCategory(
        Category $category,
        array $attributes,
    ): Category {
        return $this->taxonomies->updateCategory($category, $attributes);
    }

    public function deleteCategory(Category $category): void
    {
        if ($this->taxonomies->categoryIsInUse($category)) {
            throw new AdministrationConflictException(
                'A category assigned to projects cannot be deleted.'
            );
        }

        $this->taxonomies->deleteCategory($category);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function createTechnology(array $attributes): Technology
    {
        return $this->taxonomies->createTechnology($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateTechnology(
        Technology $technology,
        array $attributes,
    ): Technology {
        return $this->taxonomies->updateTechnology($technology, $attributes);
    }

    public function deleteTechnology(Technology $technology): void
    {
        if ($this->taxonomies->technologyIsInUse($technology)) {
            throw new AdministrationConflictException(
                'A technology assigned to projects cannot be deleted.'
            );
        }

        $this->taxonomies->deleteTechnology($technology);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function createSdg(array $attributes): Sdg
    {
        return $this->taxonomies->createSdg($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function updateSdg(Sdg $sdg, array $attributes): Sdg
    {
        return $this->taxonomies->updateSdg($sdg, $attributes);
    }

    public function deleteSdg(Sdg $sdg): void
    {
        if ($this->taxonomies->sdgIsInUse($sdg)) {
            throw new AdministrationConflictException(
                'An SDG assigned to projects cannot be deleted.'
            );
        }

        $this->taxonomies->deleteSdg($sdg);
    }
}
