import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/technologies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
export const update = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/v1/administrator/technologies/{technology}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
update.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technology: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { technology: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    technology: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        technology: typeof args.technology === 'object'
                ? args.technology.id
                : args.technology,
                }

    return update.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
update.patch = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
    const updateForm = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
        updateForm.patch = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
export const destroy = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/administrator/technologies/{technology}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
destroy.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technology: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { technology: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    technology: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        technology: typeof args.technology === 'object'
                ? args.technology.id
                : args.technology,
                }

    return destroy.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
destroy.delete = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
    const destroyForm = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
        destroyForm.delete = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const technologies = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default technologies