import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
import review from './review'
import featured from './featured'
/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::index
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:18
 * @route '/api/v1/administrator/projects'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::index
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:18
 * @route '/api/v1/administrator/projects'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::index
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:18
 * @route '/api/v1/administrator/projects'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::index
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:18
 * @route '/api/v1/administrator/projects'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::index
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:18
 * @route '/api/v1/administrator/projects'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::index
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:18
 * @route '/api/v1/administrator/projects'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::index
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:18
 * @route '/api/v1/administrator/projects'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::show
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:32
 * @route '/api/v1/administrator/projects/{project}'
 */
export const show = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/projects/{project}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::show
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:32
 * @route '/api/v1/administrator/projects/{project}'
 */
show.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::show
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:32
 * @route '/api/v1/administrator/projects/{project}'
 */
show.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::show
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:32
 * @route '/api/v1/administrator/projects/{project}'
 */
show.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::show
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:32
 * @route '/api/v1/administrator/projects/{project}'
 */
    const showForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::show
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:32
 * @route '/api/v1/administrator/projects/{project}'
 */
        showForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::show
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:32
 * @route '/api/v1/administrator/projects/{project}'
 */
        showForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::approve
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:65
 * @route '/api/v1/administrator/projects/{project}/approve'
 */
export const approve = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/projects/{project}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::approve
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:65
 * @route '/api/v1/administrator/projects/{project}/approve'
 */
approve.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::approve
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:65
 * @route '/api/v1/administrator/projects/{project}/approve'
 */
approve.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::approve
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:65
 * @route '/api/v1/administrator/projects/{project}/approve'
 */
    const approveForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::approve
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:65
 * @route '/api/v1/administrator/projects/{project}/approve'
 */
        approveForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::publish
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:84
 * @route '/api/v1/administrator/projects/{project}/publish'
 */
export const publish = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

publish.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/projects/{project}/publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::publish
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:84
 * @route '/api/v1/administrator/projects/{project}/publish'
 */
publish.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return publish.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::publish
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:84
 * @route '/api/v1/administrator/projects/{project}/publish'
 */
publish.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::publish
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:84
 * @route '/api/v1/administrator/projects/{project}/publish'
 */
    const publishForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminProjectReviewController::publish
 * @see app/Http/Controllers/Api/V1/AdminProjectReviewController.php:84
 * @route '/api/v1/administrator/projects/{project}/publish'
 */
        publishForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, options),
            method: 'post',
        })
    
    publish.form = publishForm
const projects = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
review: Object.assign(review, review),
approve: Object.assign(approve, approve),
publish: Object.assign(publish, publish),
featured: Object.assign(featured, featured),
}

export default projects