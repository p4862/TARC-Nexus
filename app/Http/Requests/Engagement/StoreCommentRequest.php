<?php

namespace App\Http\Requests\Engagement;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('comment')) {
            $this->merge([
                'comment' => trim((string) $this->input('comment')),
            ]);
        }
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        /** @var Project|null $project */
        $project = $this->route('project');

        return [
            'comment' => ['required', 'string', 'max:2000'],
            'parent_id' => [
                'sometimes',
                'nullable',
                'integer',
                Rule::exists('comments', 'id')->where(
                    fn ($query) => $query->where(
                        'project_id',
                        $project?->getKey() ?? 0,
                    ),
                ),
            ],
        ];
    }
}
