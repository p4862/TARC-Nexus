<?php

namespace App\Providers;

use App\Repositories\Contracts\AdministrationRepositoryInterface;
use App\Repositories\Contracts\AnnouncementRepositoryInterface;
use App\Repositories\Contracts\EngagementRepositoryInterface;
use App\Repositories\Contracts\MediaRepositoryInterface;
use App\Repositories\Contracts\ProjectRepositoryInterface;
use App\Repositories\Contracts\TaxonomyRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\EloquentAdministrationRepository;
use App\Repositories\EloquentAnnouncementRepository;
use App\Repositories\EloquentEngagementRepository;
use App\Repositories\EloquentMediaRepository;
use App\Repositories\EloquentProjectRepository;
use App\Repositories\EloquentTaxonomyRepository;
use App\Repositories\EloquentUserRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
        $this->app->bind(ProjectRepositoryInterface::class, EloquentProjectRepository::class);
        $this->app->bind(MediaRepositoryInterface::class, EloquentMediaRepository::class);
        $this->app->bind(TaxonomyRepositoryInterface::class, EloquentTaxonomyRepository::class);
        $this->app->bind(EngagementRepositoryInterface::class, EloquentEngagementRepository::class);
        $this->app->bind(AdministrationRepositoryInterface::class, EloquentAdministrationRepository::class);
        $this->app->bind(AnnouncementRepositoryInterface::class, EloquentAnnouncementRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict(! $this->app->isProduction());

        Password::defaults(
            static fn (): Password => Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
        );
    }
}
