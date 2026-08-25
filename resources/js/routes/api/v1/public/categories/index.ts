import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
export const projects = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(args, options),
    method: 'get',
})

projects.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/categories/{category}/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
projects.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return projects.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
projects.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
projects.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: projects.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
    const projectsForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: projects.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
        projectsForm.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projects.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:27
 * @route '/api/v1/public/categories/{category}/projects'
 */
        projectsForm.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projects.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    projects.form = projectsForm
const categories = {
    projects: Object.assign(projects, projects),
}

export default categories