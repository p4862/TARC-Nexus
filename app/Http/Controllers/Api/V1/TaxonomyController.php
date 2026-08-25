<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaxonomyResource;
use App\Repositories\Contracts\TaxonomyRepositoryInterface;

class TaxonomyController extends Controller
{
    public function __invoke(
        TaxonomyRepositoryInterface $taxonomies,
    ): TaxonomyResource {
        return (new TaxonomyResource([
            'categories' => $taxonomies->categories(),
            'sdgs' => $taxonomies->sdgs(),
            'technologies' => $taxonomies->technologies(),
        ]))->additional([
            'success' => true,
            'message' => 'Project taxonomies retrieved successfully.',
        ]);
    }
}
