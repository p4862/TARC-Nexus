<?php

use App\Http\Controllers\Api\V1\AdminAnnouncementController;
use App\Http\Controllers\Api\V1\AdminDashboardController;
use App\Http\Controllers\Api\V1\AdminProjectReviewController;
use App\Http\Controllers\Api\V1\AdminReportController;
use App\Http\Controllers\Api\V1\AdminTaxonomyController;
use App\Http\Controllers\Api\V1\AdminUserController;
use App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController;
use App\Http\Controllers\Api\V1\Auth\NewPasswordController;
use App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\ExhibitorAnalyticsController;
use App\Http\Controllers\Api\V1\FavoriteController;
use App\Http\Controllers\Api\V1\HealthController;
use App\Http\Controllers\Api\V1\ProfileAvatarController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\ProjectMediaController;
use App\Http\Controllers\Api\V1\ProjectSubmissionController;
use App\Http\Controllers\Api\V1\PublicCommentController;
use App\Http\Controllers\Api\V1\PublicDiscoveryController;
use App\Http\Controllers\Api\V1\PublicHomepageController;
use App\Http\Controllers\Api\V1\PublicProjectController;
use App\Http\Controllers\Api\V1\TaxonomyController;
use App\Http\Controllers\Api\V1\VoteController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->name('api.v1.')->group(function (): void {
    Route::get('/health', HealthController::class)->name('health');

    Route::prefix('public')
        ->name('public.')
        ->middleware('throttle:120,1')
        ->scopeBindings()
        ->group(function (): void {
            Route::get('/homepage', PublicHomepageController::class)
                ->name('homepage');
            Route::get('/taxonomies', [PublicDiscoveryController::class, 'taxonomies'])
                ->name('taxonomies');
            Route::get('/projects', [PublicProjectController::class, 'index'])
                ->name('projects.index');
            Route::get('/projects/{project:slug}', [PublicProjectController::class, 'show'])
                ->name('projects.show');
            Route::get('/projects/{project:slug}/comments', [PublicCommentController::class, 'index'])
                ->name('projects.comments.index');
            Route::get('/categories/{category}/projects', [PublicDiscoveryController::class, 'category'])
                ->name('categories.projects');
            Route::get('/sdgs/{sdg}/projects', [PublicDiscoveryController::class, 'sdg'])
                ->name('sdgs.projects');
            Route::get('/technologies/{technology}/projects', [PublicDiscoveryController::class, 'technology'])
                ->name('technologies.projects');
        });

    Route::prefix('engagement')
        ->name('engagement.')
        ->middleware(['web', 'auth:sanctum'])
        ->scopeBindings()
        ->group(function (): void {
            Route::get('/favorites', [FavoriteController::class, 'index'])
                ->name('favorites.index');
            Route::post('/projects/{project:slug}/favorite', [FavoriteController::class, 'store'])
                ->middleware('throttle:30,1')
                ->name('favorites.store');
            Route::delete('/projects/{project:slug}/favorite', [FavoriteController::class, 'destroy'])
                ->middleware('throttle:30,1')
                ->name('favorites.destroy');
            Route::post('/projects/{project:slug}/vote', [VoteController::class, 'store'])
                ->middleware('throttle:20,1')
                ->name('votes.store');
            Route::post('/projects/{project:slug}/comments', [CommentController::class, 'store'])
                ->middleware('throttle:10,1')
                ->name('comments.store');
            Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])
                ->middleware('throttle:30,1')
                ->name('comments.destroy');
        });

    Route::prefix('auth')->name('auth.')->middleware('web')->group(function (): void {
        Route::post('/register', RegisterController::class)
            ->middleware('throttle:5,1')
            ->name('register');
        Route::post('/login', [AuthenticatedSessionController::class, 'store'])
            ->middleware('throttle:6,1')
            ->name('login');
        Route::post('/forgot-password', PasswordResetLinkController::class)
            ->middleware('throttle:5,1')
            ->name('password.email');
        Route::post('/reset-password', NewPasswordController::class)
            ->middleware('throttle:5,1')
            ->name('password.update');
        Route::get('/google/pending', [GoogleAuthenticationController::class, 'pending'])
            ->middleware('throttle:12,1')
            ->name('google.pending');
        Route::post('/google/complete', [GoogleAuthenticationController::class, 'complete'])
            ->middleware('throttle:5,1')
            ->name('google.complete');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('/user', [AuthenticatedSessionController::class, 'show'])
                ->name('user');
            Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
            Route::post('/email/verification-notification', EmailVerificationNotificationController::class)
                ->middleware('throttle:6,1')
                ->name('verification.send');
        });
    });

    Route::prefix('profile')
        ->name('profile.')
        ->middleware(['web', 'auth:sanctum'])
        ->group(function (): void {
            Route::get('/', [ProfileController::class, 'show'])->name('show');
            Route::patch('/', [ProfileController::class, 'update'])
                ->middleware('throttle:20,1')
                ->name('update');
            Route::post('/avatar', [ProfileAvatarController::class, 'store'])
                ->middleware('throttle:10,1')
                ->name('avatar.store');
            Route::delete('/avatar', [ProfileAvatarController::class, 'destroy'])
                ->middleware('throttle:20,1')
                ->name('avatar.destroy');
        });

    Route::prefix('exhibitor')
        ->name('exhibitor.')
        ->middleware(['web', 'auth:sanctum', 'role:Exhibitor'])
        ->scopeBindings()
        ->group(function (): void {
            Route::get('/taxonomies', TaxonomyController::class)
                ->name('taxonomies');
            Route::get('/projects', [ProjectController::class, 'index'])
                ->name('projects.index');
            Route::post('/projects', [ProjectController::class, 'store'])
                ->middleware('throttle:10,1')
                ->name('projects.store');
            Route::get('/projects/{project}', [ProjectController::class, 'show'])
                ->name('projects.show');
            Route::patch('/projects/{project}', [ProjectController::class, 'update'])
                ->middleware('throttle:30,1')
                ->name('projects.update');
            Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])
                ->middleware('throttle:10,1')
                ->name('projects.destroy');
            Route::post('/projects/{project}/submit', ProjectSubmissionController::class)
                ->middleware('throttle:10,1')
                ->name('projects.submit');
            Route::post('/projects/{project}/media', [ProjectMediaController::class, 'store'])
                ->middleware('throttle:10,1')
                ->name('projects.media.store');
            Route::delete('/projects/{project}/media/{media}', [ProjectMediaController::class, 'destroy'])
                ->middleware('throttle:30,1')
                ->name('projects.media.destroy');
            Route::get('/analytics', ExhibitorAnalyticsController::class)
                ->name('analytics');
        });

    Route::prefix('administrator')
        ->name('administrator.')
        ->middleware(['web', 'auth:sanctum', 'role:Administrator'])
        ->scopeBindings()
        ->group(function (): void {
            Route::get('/dashboard', AdminDashboardController::class)
                ->name('dashboard');
            Route::get('/users', [AdminUserController::class, 'index'])
                ->name('users.index');
            Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole'])
                ->middleware('throttle:30,1')
                ->name('users.role.update');
            Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])
                ->middleware('throttle:20,1')
                ->name('users.destroy');

            Route::get('/taxonomies', [AdminTaxonomyController::class, 'index'])
                ->name('taxonomies.index');
            Route::post('/categories', [AdminTaxonomyController::class, 'storeCategory'])
                ->middleware('throttle:30,1')
                ->name('categories.store');
            Route::patch('/categories/{category}', [AdminTaxonomyController::class, 'updateCategory'])
                ->middleware('throttle:30,1')
                ->name('categories.update');
            Route::delete('/categories/{category}', [AdminTaxonomyController::class, 'destroyCategory'])
                ->middleware('throttle:30,1')
                ->name('categories.destroy');
            Route::post('/technologies', [AdminTaxonomyController::class, 'storeTechnology'])
                ->middleware('throttle:30,1')
                ->name('technologies.store');
            Route::patch('/technologies/{technology}', [AdminTaxonomyController::class, 'updateTechnology'])
                ->middleware('throttle:30,1')
                ->name('technologies.update');
            Route::delete('/technologies/{technology}', [AdminTaxonomyController::class, 'destroyTechnology'])
                ->middleware('throttle:30,1')
                ->name('technologies.destroy');
            Route::post('/sdgs', [AdminTaxonomyController::class, 'storeSdg'])
                ->middleware('throttle:30,1')
                ->name('sdgs.store');
            Route::patch('/sdgs/{sdg}', [AdminTaxonomyController::class, 'updateSdg'])
                ->middleware('throttle:30,1')
                ->name('sdgs.update');
            Route::delete('/sdgs/{sdg}', [AdminTaxonomyController::class, 'destroySdg'])
                ->middleware('throttle:30,1')
                ->name('sdgs.destroy');

            Route::get('/projects', [AdminProjectReviewController::class, 'index'])
                ->name('projects.index');
            Route::get('/projects/{project}', [AdminProjectReviewController::class, 'show'])
                ->name('projects.show');
            Route::post('/projects/{project}/start-review', [AdminProjectReviewController::class, 'start'])
                ->middleware('throttle:30,1')
                ->name('projects.review.start');
            Route::post('/projects/{project}/approve', [AdminProjectReviewController::class, 'approve'])
                ->middleware('throttle:30,1')
                ->name('projects.approve');
            Route::post('/projects/{project}/publish', [AdminProjectReviewController::class, 'publish'])
                ->middleware('throttle:30,1')
                ->name('projects.publish');
            Route::patch('/projects/{project}/featured', [AdminProjectReviewController::class, 'feature'])
                ->middleware('throttle:30,1')
                ->name('projects.featured.update');

            Route::get('/announcements', [AdminAnnouncementController::class, 'index'])
                ->name('announcements.index');
            Route::post('/announcements', [AdminAnnouncementController::class, 'store'])
                ->middleware('throttle:30,1')
                ->name('announcements.store');
            Route::patch('/announcements/{announcement}', [AdminAnnouncementController::class, 'update'])
                ->middleware('throttle:30,1')
                ->name('announcements.update');
            Route::delete('/announcements/{announcement}', [AdminAnnouncementController::class, 'destroy'])
                ->middleware('throttle:30,1')
                ->name('announcements.destroy');

            Route::get('/reports', AdminReportController::class)
                ->name('reports');
        });
});
