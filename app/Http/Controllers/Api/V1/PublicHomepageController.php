<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicHomepageResource;
use App\Services\PublicExhibitionService;
use Illuminate\Http\Request;

class PublicHomepageController extends Controller
{
    public function __invoke(
        Request $request,
        PublicExhibitionService $exhibition,
    ): PublicHomepageResource {
        return (new PublicHomepageResource(
            $exhibition->homepage($request->user()),
        ))->additional([
            'success' => true,
            'message' => 'Homepage exhibition data retrieved successfully.',
        ]);
    }
}
