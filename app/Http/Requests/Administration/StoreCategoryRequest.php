<?php

namespace App\Http\Requests\Administration;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return $this->categoryRules();
    }

    /**
     * @return array<string, list<string>>
     */
    protected function categoryRules(bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';
        $categoryId = $this->route('category')?->getKey();

        return [
            'name' => [
                $required,
                'string',
                'max:255',
                'unique:categories,name'.($categoryId ? ",{$categoryId}" : ''),
            ],
            'description' => [$required, 'string', 'max:5000'],
            'icon' => [
                $partial ? 'sometimes' : 'nullable',
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $normalized = [];

        foreach (['name', 'description', 'icon'] as $field) {
            if (! $this->has($field)) {
                continue;
            }

            $value = trim((string) $this->input($field));
            $normalized[$field] = $field === 'icon' && $value === ''
                ? null
                : $value;
        }

        $this->merge($normalized);
    }
}
