<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Throwable;

class ProfileService
{
    public function __construct(
        private readonly UserRepositoryInterface $users,
    ) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(User $user, array $attributes): User
    {
        $emailChanged = isset($attributes['email'])
            && $attributes['email'] !== $user->email;

        if ($emailChanged) {
            $attributes['email_verified_at'] = null;
        }

        $user = $this->users->update($user, $attributes);

        if ($emailChanged) {
            $user->sendEmailVerificationNotification();
        }

        return $user;
    }

    public function updateAvatar(User $user, UploadedFile $avatar): User
    {
        $disk = (string) config('authentication.avatar.disk');
        $directory = trim((string) config('authentication.avatar.directory'), '/').'/'.$user->getKey();
        $oldAvatar = $user->avatar;
        $newAvatar = $avatar->store($directory, $disk);

        if ($newAvatar === false) {
            throw new RuntimeException('The avatar could not be stored.');
        }

        try {
            $user = $this->users->update($user, ['avatar' => $newAvatar]);
        } catch (Throwable $exception) {
            Storage::disk($disk)->delete($newAvatar);

            throw $exception;
        }

        if ($oldAvatar !== null && $oldAvatar !== $newAvatar) {
            Storage::disk($disk)->delete($oldAvatar);
        }

        return $user;
    }

    public function removeAvatar(User $user): User
    {
        $disk = (string) config('authentication.avatar.disk');
        $oldAvatar = $user->avatar;
        $user = $this->users->update($user, ['avatar' => null]);

        if ($oldAvatar !== null) {
            Storage::disk($disk)->delete($oldAvatar);
        }

        return $user;
    }
}
