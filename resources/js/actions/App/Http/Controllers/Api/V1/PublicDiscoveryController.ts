import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
export const taxonomies = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: taxonomies.url(options),
    method: 'get',
})

taxonomies.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/taxonomies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
taxonomies.url = (options?: RouteQueryOptions) => {
    return taxonomies.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
taxonomies.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: taxonomies.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
taxonomies.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: taxonomies.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
    const taxonomiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: taxonomies.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
        taxonomiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: taxonomies.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
        taxonomiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: taxonomies.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    taxonomies.form = taxonomiesForm
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::category
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
export const category = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category.url(args, options),
    method: 'get',
})

category.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/categories/{category}/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::category
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
category.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return category.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::category
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
category.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::category
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
category.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: category.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::category
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
    const categoryForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: category.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::category
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
        categoryForm.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::category
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
        categoryForm.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    category.form = categoryForm
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::sdg
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
export const sdg = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sdg.url(args, options),
    method: 'get',
})

sdg.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/sdgs/{sdg}/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::sdg
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
sdg.url = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return sdg.definition.url
            .replace('{sdg}', parsedArgs.sdg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::sdg
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
sdg.get = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sdg.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::sdg
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
sdg.head = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sdg.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::sdg
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
    const sdgForm = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sdg.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::sdg
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
        sdgForm.get = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sdg.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::sdg
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
        sdgForm.head = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sdg.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sdg.form = sdgForm
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::technology
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
export const technology = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: technology.url(args, options),
    method: 'get',
})

technology.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/technologies/{technology}/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::technology
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
technology.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return technology.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::technology
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
technology.get = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: technology.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::technology
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
technology.head = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: technology.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::technology
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
    const technologyForm = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: technology.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::technology
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
        technologyForm.get = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: technology.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::technology
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
        technologyForm.head = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: technology.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    technology.form = technologyForm
const PublicDiscoveryController = { taxonomies, category, sdg, technology }

export default PublicDiscoveryController