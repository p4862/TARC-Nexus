import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/api/v1/auth/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
    const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
        sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(options),
            method: 'post',
        })
    
    send.form = sendForm
const verification = {
    send: Object.assign(send, send),
}

export default verification