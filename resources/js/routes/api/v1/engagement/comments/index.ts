import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\CommentController::store
 * @see app/Http/Controllers/Api/V1/CommentController.php:16
 * @route '/api/v1/engagement/projects/{project}/comments'
 */
export const store = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/engagement/projects/{project}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CommentController::store
 * @see app/Http/Controllers/Api/V1/CommentController.php:16
 * @route '/api/v1/engagement/projects/{project}/comments'
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
* @see \App\Http\Controllers\Api\V1\CommentController::store
 * @see app/Http/Controllers/Api/V1/CommentController.php:16
 * @route '/api/v1/engagement/projects/{project}/comments'
 */
store.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\CommentController::store
 * @see app/Http/Controllers/Api/V1/CommentController.php:16
 * @route '/api/v1/engagement/projects/{project}/comments'
 */
    const storeForm = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\CommentController::store
 * @see app/Http/Controllers/Api/V1/CommentController.php:16
 * @route '/api/v1/engagement/projects/{project}/comments'
 */
        storeForm.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\CommentController::destroy
 * @see app/Http/Controllers/Api/V1/CommentController.php:35
 * @route '/api/v1/engagement/comments/{comment}'
 */
export const destroy = (args: { comment: number | { id: number } } | [comment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/engagement/comments/{comment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\CommentController::destroy
 * @see app/Http/Controllers/Api/V1/CommentController.php:35
 * @route '/api/v1/engagement/comments/{comment}'
 */
destroy.url = (args: { comment: number | { id: number } } | [comment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { comment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { comment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    comment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        comment: typeof args.comment === 'object'
                ? args.comment.id
                : args.comment,
                }

    return destroy.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CommentController::destroy
 * @see app/Http/Controllers/Api/V1/CommentController.php:35
 * @route '/api/v1/engagement/comments/{comment}'
 */
destroy.delete = (args: { comment: number | { id: number } } | [comment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\CommentController::destroy
 * @see app/Http/Controllers/Api/V1/CommentController.php:35
 * @route '/api/v1/engagement/comments/{comment}'
 */
    const destroyForm = (args: { comment: number | { id: number } } | [comment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\CommentController::destroy
 * @see app/Http/Controllers/Api/V1/CommentController.php:35
 * @route '/api/v1/engagement/comments/{comment}'
 */
        destroyForm.delete = (args: { comment: number | { id: number } } | [comment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const comments = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default comments