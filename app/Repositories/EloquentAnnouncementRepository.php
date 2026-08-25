<?php

namespace App\Repositories;

use App\Models\Announcement;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentAnnouncementRepository implements AnnouncementRepositoryInterface
{
    public function paginate(int $perPage): LengthAwarePaginator
    {
        return Announcement::query()
            ->with('author:id,name')
            ->latest('published_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function published(int $limit): Collection
    {
        return Announcement::query()
            ->published()
            ->with('author:id,name')
            ->latest('published_at')
            ->limit($limit)
            ->get();
    }

    public function create(array $attributes): Announcement
    {
        return Announcement::query()
            ->create($attributes)
            ->load('author:id,name');
    }

    public function update(
        Announcement $announcement,
        array $attributes,
    ): Announcement {
        $announcement->fill($attributes);
        $announcement->save();

        return $announcement->refresh()->load('author:id,name');
    }

    public function delete(Announcement $announcement): void
    {
        $announcement->delete();
    }
}
