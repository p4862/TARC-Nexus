import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::index
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:19
 * @route '/api/v1/engagement/favorites'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/engagement/favorites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::index
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:19
 * @route '/api/v1/engagement/favorites'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::index
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:19
 * @route '/api/v1/engagement/favorites'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::index
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:19
 * @route '/api/v1/engagement/favorites'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\FavoriteController::index
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:19
 * @route '/api/v1/engagement/favorites'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\FavoriteController::index
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:19
 * @route '/api/v1/engagement/favorites'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\FavoriteController::index
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:19
 * @route '/api/v1/engagement/favorites'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::store
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:36
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
export const store = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/engagement/projects/{project}/favorite',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::store
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:36
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
store.url = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { project: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.slug
                : args.project,
                }

    return store.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::store
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:36
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
store.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\FavoriteController::store
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:36
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
    const storeForm = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\FavoriteController::store
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:36
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
        storeForm.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::destroy
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:56
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
export const destroy = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/engagement/projects/{project}/favorite',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::destroy
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:56
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
destroy.url = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { project: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.slug
                : args.project,
                }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\FavoriteController::destroy
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:56
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
destroy.delete = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\FavoriteController::destroy
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:56
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
    const destroyForm = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\FavoriteController::destroy
 * @see app/Http/Controllers/Api/V1/FavoriteController.php:56
 * @route '/api/v1/engagement/projects/{project}/favorite'
 */
        destroyForm.delete = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const favorites = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default favorites