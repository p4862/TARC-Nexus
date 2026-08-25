<?php

namespace App\Http\Requests\Administration;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSdgRequest extends FormRequest
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
        return $this->sdgRules();
    }

    /**
     * @return array<string, list<mixed>>
     */
    protected function sdgRules(bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';
        $sdgId = $this->route('sdg')?->getKey();

        return [
            'code' => [
                $required,
                'string',
                Rule::in(['8', '11', '12']),
                Rule::unique('sdgs', 'code')->ignore($sdgId),
            ],
            'title' => [$required, 'string', 'max:255'],
            'description' => [$required, 'string', 'max:5000'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $normalized = [];

        foreach (['code', 'title', 'description'] as $field) {
            if ($this->has($field)) {
                $normalized[$field] = trim((string) $this->input($field));
            }
        }

        $this->merge($normalized);
    }
}
