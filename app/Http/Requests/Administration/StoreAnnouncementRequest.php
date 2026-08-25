<?php

namespace App\Http\Requests\Administration;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnnouncementRequest extends FormRequest
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
        return $this->announcementRules();
    }

    /**
     * @return array<string, list<string>>
     */
    protected function announcementRules(bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return [
            'title' => [$required, 'string', 'max:255'],
            'content' => [$required, 'string', 'max:10000'],
            'published_at' => [$required, 'date'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $normalized = [];

        foreach (['title', 'content'] as $field) {
            if ($this->has($field)) {
                $normalized[$field] = trim((string) $this->input($field));
            }
        }

        $this->merge($normalized);
    }
}
