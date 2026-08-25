import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PublicCommentController::index
 * @see app/Http/Controllers/Api/V1/PublicCommentController.php:13
 * @route '/api/v1/public/projects/{project}/comments'
 */
export const index = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/projects/{project}/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicCommentController::index
 * @see app/Http/Controllers/Api/V1/PublicCommentController.php:13
 * @route '/api/v1/public/projects/{project}/comments'
 */
index.url = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicCommentController::index
 * @see app/Http/Controllers/Api/V1/PublicCommentController.php:13
 * @route '/api/v1/public/projects/{project}/comments'
 */
index.get = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicCommentController::index
 * @see app/Http/Controllers/Api/V1/PublicCommentController.php:13
 * @route '/api/v1/public/projects/{project}/comments'
 */
index.head = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicCommentController::index
 * @see app/Http/Controllers/Api/V1/PublicCommentController.php:13
 * @route '/api/v1/public/projects/{project}/comments'
 */
    const indexForm = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicCommentController::index
 * @see app/Http/Controllers/Api/V1/PublicCommentController.php:13
 * @route '/api/v1/public/projects/{project}/comments'
 */
        indexForm.get = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicCommentController::index
 * @see app/Http/Controllers/Api/V1/PublicCommentController.php:13
 * @route '/api/v1/public/projects/{project}/comments'
 */
        indexForm.head = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const comments = {
    index: Object.assign(index, index),
}

export default comments