<?php

namespace App\Http\Requests\Administration;

class UpdateTechnologyRequest extends StoreTechnologyRequest
{
    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return $this->technologyRules(true);
    }
}
