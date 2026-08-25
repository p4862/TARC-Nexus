<?php

namespace App\Repositories\Contracts;

use App\Models\Announcement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface AnnouncementRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<int, Announcement>
     */
    public function paginate(int $perPage): LengthAwarePaginator;

    /**
     * @return Collection<int, Announcement>
     */
    public function published(int $limit): Collection;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Announcement;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(
        Announcement $announcement,
        array $attributes,
    ): Announcement;

    public function delete(Announcement $announcement): void;
}
