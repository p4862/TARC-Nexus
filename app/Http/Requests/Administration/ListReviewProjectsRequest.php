<?php

namespace App\Http\Requests\Administration;

use App\Enums\ProjectStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListReviewProjectsRequest extends FormRequest
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
            'status' => [
                'sometimes',
                'string',
                Rule::in([
                    ProjectStatus::Submitted->value,
                    ProjectStatus::UnderReview->value,
                    ProjectStatus::Approved->value,
                    ProjectStatus::Published->value,
                ]),
            ],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:50'],
            'page' => ['sometimes', 'integer', 'min:1'],
        ];
    }
}
