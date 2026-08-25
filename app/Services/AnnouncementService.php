<?php

namespace App\Services;

use App\Models\Announcement;
use App\Models\User;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AnnouncementService
{
    public function __construct(
        private readonly AnnouncementRepositoryInterface $announcements,
    ) {}

    /**
     * @return LengthAwarePaginator<int, Announcement>
     */
    public function index(int $perPage): LengthAwarePaginator
    {
        return $this->announcements->paginate($perPage);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(User $author, array $attributes): Announcement
    {
        return $this->announcements->create([
            ...$attributes,
            'user_id' => $author->getKey(),
        ]);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(
        Announcement $announcement,
        array $attributes,
    ): Announcement {
        return $this->announcements->update($announcement, $attributes);
    }

    public function delete(Announcement $announcement): void
    {
        $this->announcements->delete($announcement);
    }
}
