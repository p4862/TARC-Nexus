<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
            'name' => ['sometimes', 'required', 'string', 'max:120'],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email:rfc',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user()?->id),
            ],
            'institution' => ['sometimes', 'required', 'string', 'max:255'],
            'biography' => ['sometimes', 'nullable', 'string', 'max:2000'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $normalized = [];

        foreach (['name', 'institution'] as $field) {
            if ($this->has($field)) {
                $normalized[$field] = trim((string) $this->input($field));
            }
        }

        if ($this->has('email')) {
            $normalized['email'] = mb_strtolower(trim((string) $this->input('email')));
        }

        if ($this->has('biography')) {
            $biography = trim((string) $this->input('biography'));
            $normalized['biography'] = $biography === '' ? null : $biography;
        }

        $this->merge($normalized);
    }
}
