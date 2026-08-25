import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/auth/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::show
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::show
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::show
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::show
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::show
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::show
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::show
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

destroy.definition = {
    methods: ["post"],
    url: '/api/v1/auth/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
destroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
        destroyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(options),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AuthenticatedSessionController = { store, show, destroy }

export default AuthenticatedSessionController