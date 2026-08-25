import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::store
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:14
 * @route '/api/v1/profile/avatar'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::store
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:14
 * @route '/api/v1/profile/avatar'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::store
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:14
 * @route '/api/v1/profile/avatar'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::store
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:14
 * @route '/api/v1/profile/avatar'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::store
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:14
 * @route '/api/v1/profile/avatar'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::destroy
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:32
 * @route '/api/v1/profile/avatar'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/profile/avatar',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::destroy
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:32
 * @route '/api/v1/profile/avatar'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::destroy
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:32
 * @route '/api/v1/profile/avatar'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::destroy
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:32
 * @route '/api/v1/profile/avatar'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ProfileAvatarController::destroy
 * @see app/Http/Controllers/Api/V1/ProfileAvatarController.php:32
 * @route '/api/v1/profile/avatar'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProfileAvatarController = { store, destroy }

export default ProfileAvatarController