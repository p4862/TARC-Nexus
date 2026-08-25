<?php

namespace App\Http\Requests\Administration;

class UpdateSdgRequest extends StoreSdgRequest
{
    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return $this->sdgRules(true);
    }
}
