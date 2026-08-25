import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
export const projects = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(args, options),
    method: 'get',
})

projects.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/technologies/{technology}/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
projects.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return projects.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
projects.get = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projects.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
projects.head = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: projects.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
    const projectsForm = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: projects.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
        projectsForm.get = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projects.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::projects
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:61
 * @route '/api/v1/public/technologies/{technology}/projects'
 */
        projectsForm.head = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projects.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    projects.form = projectsForm
const technologies = {
    projects: Object.assign(projects, projects),
}

export default technologies