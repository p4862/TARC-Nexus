<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListPublishedProjectsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return [
            'search' => ['sometimes', 'string', 'max:120'],
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'sdg_id' => ['sometimes', 'integer', 'exists:sdgs,id'],
            'technology_id' => ['sometimes', 'integer', 'exists:technologies,id'],
            'year' => ['sometimes', 'integer', 'min:2000', 'max:2100'],
            'featured' => ['sometimes', 'boolean'],
            'sort' => [
                'sometimes',
                'string',
                Rule::in(['recent', 'popular', 'alphabetical', 'viewed']),
            ],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:24'],
            'page' => ['sometimes', 'integer', 'min:1'],
        ];
    }
}
