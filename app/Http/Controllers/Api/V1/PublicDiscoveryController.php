<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\ListPublishedProjectsRequest;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\PublicTaxonomyResource;
use App\Models\Category;
use App\Models\Sdg;
use App\Models\Technology;
use App\Services\PublicExhibitionService;

class PublicDiscoveryController extends Controller
{
    public function taxonomies(
        PublicExhibitionService $exhibition,
    ): PublicTaxonomyResource {
        return (new PublicTaxonomyResource(
            $exhibition->taxonomies(),
        ))->additional([
            'success' => true,
            'message' => 'Discovery taxonomies retrieved successfully.',
        ]);
    }

    public function category(
        ListPublishedProjectsRequest $request,
        Category $category,
        PublicExhibitionService $exhibition,
    ) {
        return ProjectCardResource::collection(
            $exhibition->category(
                $category,
                $request->validated(),
                $request->user(),
            ),
        )->additional([
            'success' => true,
            'message' => 'Category projects retrieved successfully.',
        ]);
    }

    public function sdg(
        ListPublishedProjectsRequest $request,
        Sdg $sdg,
        PublicExhibitionService $exhibition,
    ) {
        return ProjectCardResource::collection(
            $exhibition->sdg(
                $sdg,
                $request->validated(),
                $request->user(),
            ),
        )->additional([
            'success' => true,
            'message' => 'SDG projects retrieved successfully.',
        ]);
    }

    public function technology(
        ListPublishedProjectsRequest $request,
        Technology $technology,
        PublicExhibitionService $exhibition,
    ) {
        return ProjectCardResource::collection(
            $exhibition->technology(
                $technology,
                $request->validated(),
                $request->user(),
            ),
        )->additional([
            'success' => true,
            'message' => 'Technology projects retrieved successfully.',
        ]);
    }
}
