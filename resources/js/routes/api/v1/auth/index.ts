import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
import password from './password'
import google from './google'
import verification from './verification'
/**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/v1/auth/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: register.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
        registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: register.url(options),
            method: 'post',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/v1/auth/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:23
 * @route '/api/v1/auth/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::user
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::user
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::user
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::user
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::user
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
    const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: user.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::user
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
        userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::user
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:14
 * @route '/api/v1/auth/user'
 */
        userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    user.form = userForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/v1/auth/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Api/V1/Auth/AuthenticatedSessionController.php:36
 * @route '/api/v1/auth/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
const auth = {
    register: Object.assign(register, register),
login: Object.assign(login, login),
password: Object.assign(password, password),
google: Object.assign(google, google),
user: Object.assign(user, user),
logout: Object.assign(logout, logout),
verification: Object.assign(verification, verification),
}

export default auth