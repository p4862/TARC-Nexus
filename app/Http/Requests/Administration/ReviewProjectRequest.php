<?php

namespace App\Http\Requests\Administration;

use Illuminate\Foundation\Http\FormRequest;

class ReviewProjectRequest extends FormRequest
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
        return [
            'review_notes' => ['nullable', 'string', 'max:5000'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (! $this->has('review_notes')) {
            return;
        }

        $notes = trim((string) $this->input('review_notes'));

        $this->merge([
            'review_notes' => $notes === '' ? null : $notes,
        ]);
    }
}
