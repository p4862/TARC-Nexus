import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/sdgs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::store
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
export const update = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/v1/administrator/sdgs/{sdg}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
update.url = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sdg: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sdg: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sdg: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sdg: typeof args.sdg === 'object'
                ? args.sdg.id
                : args.sdg,
                }

    return update.definition.url
            .replace('{sdg}', parsedArgs.sdg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
update.patch = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::update
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
    const updateForm = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
        updateForm.patch = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
export const destroy = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/administrator/sdgs/{sdg}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
destroy.url = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sdg: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sdg: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sdg: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sdg: typeof args.sdg === 'object'
                ? args.sdg.id
                : args.sdg,
                }

    return destroy.definition.url
            .replace('{sdg}', parsedArgs.sdg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
destroy.delete = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroy
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
    const destroyForm = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
        destroyForm.delete = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const sdgs = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default sdgs