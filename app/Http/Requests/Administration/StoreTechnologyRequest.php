<?php

namespace App\Http\Requests\Administration;

use Illuminate\Foundation\Http\FormRequest;

class StoreTechnologyRequest extends FormRequest
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
        return $this->technologyRules();
    }

    /**
     * @return array<string, list<string>>
     */
    protected function technologyRules(bool $partial = false): array
    {
        $technologyId = $this->route('technology')?->getKey();

        return [
            'name' => [
                $partial ? 'sometimes' : 'required',
                'string',
                'max:255',
                'unique:technologies,name'.($technologyId ? ",{$technologyId}" : ''),
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('name')) {
            $this->merge([
                'name' => trim((string) $this->input('name')),
            ]);
        }
    }
}
