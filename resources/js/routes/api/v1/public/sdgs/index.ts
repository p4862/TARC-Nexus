import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
export const projects = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(args, options),
    method: 'get',
})

projects.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/sdgs/{sdg}/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
projects.url = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return projects.definition.url
            .replace('{sdg}', parsedArgs.sdg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
projects.get = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
projects.head = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: projects.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
    const projectsForm = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: projects.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
        projectsForm.get = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projects.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:44
 * @route '/api/v1/public/sdgs/{sdg}/projects'
 */
        projectsForm.head = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projects.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    projects.form = projectsForm
const sdgs = {
    projects: Object.assign(projects, projects),
}

export default sdgs