import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::pending
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:51
 * @route '/api/v1/auth/google/pending'
 */
export const pending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

pending.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/google/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::pending
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:51
 * @route '/api/v1/auth/google/pending'
 */
pending.url = (options?: RouteQueryOptions) => {
    return pending.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::pending
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:51
 * @route '/api/v1/auth/google/pending'
 */
pending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::pending
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:51
 * @route '/api/v1/auth/google/pending'
 */
pending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pending.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::pending
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:51
 * @route '/api/v1/auth/google/pending'
 */
    const pendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pending.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::pending
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:51
 * @route '/api/v1/auth/google/pending'
 */
        pendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::pending
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:51
 * @route '/api/v1/auth/google/pending'
 */
        pendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pending.form = pendingForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::complete
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:62
 * @route '/api/v1/auth/google/complete'
 */
export const complete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/api/v1/auth/google/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::complete
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:62
 * @route '/api/v1/auth/google/complete'
 */
complete.url = (options?: RouteQueryOptions) => {
    return complete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::complete
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:62
 * @route '/api/v1/auth/google/complete'
 */
complete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::complete
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:62
 * @route '/api/v1/auth/google/complete'
 */
    const completeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::complete
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:62
 * @route '/api/v1/auth/google/complete'
 */
        completeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::redirect
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:18
 * @route '/api/v1/auth/google/redirect'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/google/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::redirect
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:18
 * @route '/api/v1/auth/google/redirect'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::redirect
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:18
 * @route '/api/v1/auth/google/redirect'
 */
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::redirect
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:18
 * @route '/api/v1/auth/google/redirect'
 */
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::redirect
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:18
 * @route '/api/v1/auth/google/redirect'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::redirect
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:18
 * @route '/api/v1/auth/google/redirect'
 */
        redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::redirect
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:18
 * @route '/api/v1/auth/google/redirect'
 */
        redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::callback
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:32
 * @route '/api/v1/auth/google/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/google/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::callback
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:32
 * @route '/api/v1/auth/google/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::callback
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:32
 * @route '/api/v1/auth/google/callback'
 */
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::callback
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:32
 * @route '/api/v1/auth/google/callback'
 */
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::callback
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:32
 * @route '/api/v1/auth/google/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: callback.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::callback
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:32
 * @route '/api/v1/auth/google/callback'
 */
        callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\Auth\GoogleAuthenticationController::callback
 * @see app/Http/Controllers/Api/V1/Auth/GoogleAuthenticationController.php:32
 * @route '/api/v1/auth/google/callback'
 */
        callbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    callback.form = callbackForm
const GoogleAuthenticationController = { pending, complete, redirect, callback }

export default GoogleAuthenticationController