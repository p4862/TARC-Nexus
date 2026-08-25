import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\VoteController::store
 * @see app/Http/Controllers/Api/V1/VoteController.php:16
 * @route '/api/v1/engagement/projects/{project}/vote'
 */
export const store = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/engagement/projects/{project}/vote',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\VoteController::store
 * @see app/Http/Controllers/Api/V1/VoteController.php:16
 * @route '/api/v1/engagement/projects/{project}/vote'
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
* @see \App\Http\Controllers\Api\V1\VoteController::store
 * @see app/Http/Controllers/Api/V1/VoteController.php:16
 * @route '/api/v1/engagement/projects/{project}/vote'
 */
store.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\VoteController::store
 * @see app/Http/Controllers/Api/V1/VoteController.php:16
 * @route '/api/v1/engagement/projects/{project}/vote'
 */
    const storeForm = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\VoteController::store
 * @see app/Http/Controllers/Api/V1/VoteController.php:16
 * @route '/api/v1/engagement/projects/{project}/vote'
 */
        storeForm.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const VoteController = { store }

export default VoteController