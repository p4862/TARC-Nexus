<?php

namespace App\Http\Requests\Administration;

class UpdateCategoryRequest extends StoreCategoryRequest
{
    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return $this->categoryRules(true);
    }
}
