<?php

namespace App\Http\Requests\Administration;

class UpdateAnnouncementRequest extends StoreAnnouncementRequest
{
    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return $this->announcementRules(true);
    }
}
