import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/login'
 */
const ViewControllerb6041c76e8e1cd791f8f89d035d48611 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllerb6041c76e8e1cd791f8f89d035d48611.url(options),
    method: 'get',
})

ViewControllerb6041c76e8e1cd791f8f89d035d48611.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/login'
 */
ViewControllerb6041c76e8e1cd791f8f89d035d48611.url = (options?: RouteQueryOptions) => {
    return ViewControllerb6041c76e8e1cd791f8f89d035d48611.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/login'
 */
ViewControllerb6041c76e8e1cd791f8f89d035d48611.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllerb6041c76e8e1cd791f8f89d035d48611.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/login'
 */
ViewControllerb6041c76e8e1cd791f8f89d035d48611.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewControllerb6041c76e8e1cd791f8f89d035d48611.url(options),
    method: 'head',
})

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/login'
 */
    const ViewControllerb6041c76e8e1cd791f8f89d035d48611Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewControllerb6041c76e8e1cd791f8f89d035d48611.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/login'
 */
        ViewControllerb6041c76e8e1cd791f8f89d035d48611Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllerb6041c76e8e1cd791f8f89d035d48611.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/login'
 */
        ViewControllerb6041c76e8e1cd791f8f89d035d48611Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllerb6041c76e8e1cd791f8f89d035d48611.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewControllerb6041c76e8e1cd791f8f89d035d48611.form = ViewControllerb6041c76e8e1cd791f8f89d035d48611Form
    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/email/verify'
 */
const ViewController3685c2a6d0409105894fa4459032304d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController3685c2a6d0409105894fa4459032304d.url(options),
    method: 'get',
})

ViewController3685c2a6d0409105894fa4459032304d.definition = {
    methods: ["get","head"],
    url: '/email/verify',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/email/verify'
 */
ViewController3685c2a6d0409105894fa4459032304d.url = (options?: RouteQueryOptions) => {
    return ViewController3685c2a6d0409105894fa4459032304d.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/email/verify'
 */
ViewController3685c2a6d0409105894fa4459032304d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController3685c2a6d0409105894fa4459032304d.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/email/verify'
 */
ViewController3685c2a6d0409105894fa4459032304d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewController3685c2a6d0409105894fa4459032304d.url(options),
    method: 'head',
})

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/email/verify'
 */
    const ViewController3685c2a6d0409105894fa4459032304dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewController3685c2a6d0409105894fa4459032304d.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/email/verify'
 */
        ViewController3685c2a6d0409105894fa4459032304dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController3685c2a6d0409105894fa4459032304d.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/email/verify'
 */
        ViewController3685c2a6d0409105894fa4459032304dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController3685c2a6d0409105894fa4459032304d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewController3685c2a6d0409105894fa4459032304d.form = ViewController3685c2a6d0409105894fa4459032304dForm
    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/reset-password/{token}'
 */
const ViewController784bb30b123acd5cf553758712ebb4d6 = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController784bb30b123acd5cf553758712ebb4d6.url(args, options),
    method: 'get',
})

ViewController784bb30b123acd5cf553758712ebb4d6.definition = {
    methods: ["get","head"],
    url: '/reset-password/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/reset-password/{token}'
 */
ViewController784bb30b123acd5cf553758712ebb4d6.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return ViewController784bb30b123acd5cf553758712ebb4d6.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/reset-password/{token}'
 */
ViewController784bb30b123acd5cf553758712ebb4d6.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController784bb30b123acd5cf553758712ebb4d6.url(args, options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/reset-password/{token}'
 */
ViewController784bb30b123acd5cf553758712ebb4d6.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewController784bb30b123acd5cf553758712ebb4d6.url(args, options),
    method: 'head',
})

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/reset-password/{token}'
 */
    const ViewController784bb30b123acd5cf553758712ebb4d6Form = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewController784bb30b123acd5cf553758712ebb4d6.url(args, options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/reset-password/{token}'
 */
        ViewController784bb30b123acd5cf553758712ebb4d6Form.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController784bb30b123acd5cf553758712ebb4d6.url(args, options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/reset-password/{token}'
 */
        ViewController784bb30b123acd5cf553758712ebb4d6Form.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController784bb30b123acd5cf553758712ebb4d6.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewController784bb30b123acd5cf553758712ebb4d6.form = ViewController784bb30b123acd5cf553758712ebb4d6Form
    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/{path?}'
 */
const ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5 = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.url(args, options),
    method: 'get',
})

ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.definition = {
    methods: ["get","head"],
    url: '/{path?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/{path?}'
 */
ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.url = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "path",
        ])

    const parsedArgs = {
                        path: args?.path,
                }

    return ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.definition.url
            .replace('{path?}', parsedArgs.path?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/{path?}'
 */
ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.url(args, options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/{path?}'
 */
ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.url(args, options),
    method: 'head',
})

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/{path?}'
 */
    const ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5Form = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.url(args, options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/{path?}'
 */
        ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5Form.get = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.url(args, options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/{path?}'
 */
        ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5Form.head = (args?: { path?: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5.form = ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5Form

/**
* Multiple routes resolve to \Illuminate\Routing\ViewController::ViewController, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `ViewController['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
const ViewController = {
    '/login': ViewControllerb6041c76e8e1cd791f8f89d035d48611,
    '/email/verify': ViewController3685c2a6d0409105894fa4459032304d,
    '/reset-password/{token}': ViewController784bb30b123acd5cf553758712ebb4d6,
    '/{path?}': ViewControllerb82c0a9e1354db44d1f2e9c8cd5006c5,
}

export default ViewController