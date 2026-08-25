import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
export const email = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(options),
    method: 'post',
})

email.definition = {
    methods: ["post"],
    url: '/api/v1/auth/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
email.url = (options?: RouteQueryOptions) => {
    return email.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
email.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
    const emailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: email.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
        emailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: email.url(options),
            method: 'post',
        })
    
    email.form = emailForm
/**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/api/v1/auth/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const password = {
    email: Object.assign(email, email),
update: Object.assign(update, update),
}

export default password