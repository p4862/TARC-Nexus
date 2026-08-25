import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::start
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:46
 * @route '/api/v1/administrator/projects/{project}/start-review'
 */
export const start = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/projects/{project}/start-review',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::start
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:46
 * @route '/api/v1/administrator/projects/{project}/start-review'
 */
start.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                }

    return start.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::start
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:46
 * @route '/api/v1/administrator/projects/{project}/start-review'
 */
start.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::start
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:46
 * @route '/api/v1/administrator/projects/{project}/start-review'
 */
    const startForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: start.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::start
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:46
 * @route '/api/v1/administrator/projects/{project}/start-review'
 */
        startForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: start.url(args, options),
            method: 'post',
        })
    
    start.form = startForm
const review = {
    start: Object.assign(start, start),
}

export default review