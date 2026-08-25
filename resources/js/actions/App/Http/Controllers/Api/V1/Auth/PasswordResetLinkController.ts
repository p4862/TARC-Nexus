import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
const PasswordResetLinkController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: PasswordResetLinkController.url(options),
    method: 'post',
})

PasswordResetLinkController.definition = {
    methods: ["post"],
    url: '/api/v1/auth/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
PasswordResetLinkController.url = (options?: RouteQueryOptions) => {
    return PasswordResetLinkController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
PasswordResetLinkController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: PasswordResetLinkController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
    const PasswordResetLinkControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: PasswordResetLinkController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\PasswordResetLinkController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/PasswordResetLinkController.php:12
 * @route '/api/v1/auth/forgot-password'
 */
        PasswordResetLinkControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: PasswordResetLinkController.url(options),
            method: 'post',
        })
    
    PasswordResetLinkController.form = PasswordResetLinkControllerForm
export default PasswordResetLinkController