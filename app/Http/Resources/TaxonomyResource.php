<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaxonomyResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'categories' => $this->resource['categories']->map(
                fn ($category): array => [
                    'id' => $category->getKey(),
                    'name' => $category->name,
                    'description' => $category->description,
                    'icon' => $category->icon,
                ]
            )->values(),
            'sdgs' => $this->resource['sdgs']->map(
                fn ($sdg): array => [
                    'id' => $sdg->getKey(),
                    'code' => $sdg->code,
                    'title' => $sdg->title,
                    'description' => $sdg->description,
                ]
            )->values(),
            'technologies' => $this->resource['technologies']->map(
                fn ($technology): array => [
                    'id' => $technology->getKey(),
                    'name' => $technology->name,
                ]
            )->values(),
        ];
    }
}
