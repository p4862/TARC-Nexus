<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administration\StoreCategoryRequest;
use App\Http\Requests\Administration\StoreSdgRequest;
use App\Http\Requests\Administration\StoreTechnologyRequest;
use App\Http\Requests\Administration\UpdateCategoryRequest;
use App\Http\Requests\Administration\UpdateSdgRequest;
use App\Http\Requests\Administration\UpdateTechnologyRequest;
use App\Http\Resources\AdminTaxonomyResource;
use App\Models\Category;
use App\Models\Sdg;
use App\Models\Technology;
use App\Models\User;
use App\Services\TaxonomyManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class AdminTaxonomyController extends Controller
{
    public function index(
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('viewAdministration', User::class);

        return $this->response(
            $taxonomies,
            'Taxonomies retrieved successfully.',
        );
    }

    public function storeCategory(
        StoreCategoryRequest $request,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('create', Category::class);
        $taxonomies->createCategory($request->validated());

        return $this->response(
            $taxonomies,
            'Category created successfully.',
            201,
        );
    }

    public function updateCategory(
        UpdateCategoryRequest $request,
        Category $category,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('update', $category);
        $taxonomies->updateCategory($category, $request->validated());

        return $this->response(
            $taxonomies,
            'Category updated successfully.',
        );
    }

    public function destroyCategory(
        Category $category,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('delete', $category);
        $taxonomies->deleteCategory($category);

        return $this->response(
            $taxonomies,
            'Category deleted successfully.',
        );
    }

    public function storeTechnology(
        StoreTechnologyRequest $request,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('create', Technology::class);
        $taxonomies->createTechnology($request->validated());

        return $this->response(
            $taxonomies,
            'Technology created successfully.',
            201,
        );
    }

    public function updateTechnology(
        UpdateTechnologyRequest $request,
        Technology $technology,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('update', $technology);
        $taxonomies->updateTechnology($technology, $request->validated());

        return $this->response(
            $taxonomies,
            'Technology updated successfully.',
        );
    }

    public function destroyTechnology(
        Technology $technology,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('delete', $technology);
        $taxonomies->deleteTechnology($technology);

        return $this->response(
            $taxonomies,
            'Technology deleted successfully.',
        );
    }

    public function storeSdg(
        StoreSdgRequest $request,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('create', Sdg::class);
        $taxonomies->createSdg($request->validated());

        return $this->response(
            $taxonomies,
            'SDG created successfully.',
            201,
        );
    }

    public function updateSdg(
        UpdateSdgRequest $request,
        Sdg $sdg,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('update', $sdg);
        $taxonomies->updateSdg($sdg, $request->validated());

        return $this->response(
            $taxonomies,
            'SDG updated successfully.',
        );
    }

    public function destroySdg(
        Sdg $sdg,
        TaxonomyManagementService $taxonomies,
    ): JsonResponse {
        Gate::authorize('delete', $sdg);
        $taxonomies->deleteSdg($sdg);

        return $this->response(
            $taxonomies,
            'SDG deleted successfully.',
        );
    }

    private function response(
        TaxonomyManagementService $taxonomies,
        string $message,
        int $status = 200,
    ): JsonResponse {
        return (new AdminTaxonomyResource($taxonomies->index()))
            ->additional([
                'success' => true,
                'message' => $message,
            ])
            ->response()
            ->setStatusCode($status);
    }
}
