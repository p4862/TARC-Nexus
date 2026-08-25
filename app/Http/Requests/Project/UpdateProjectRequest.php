<?php

namespace App\Http\Requests\Project;

class UpdateProjectRequest extends StoreProjectRequest
{
    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return $this->projectRules(true);
    }
}
