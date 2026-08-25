import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
const EmailVerificationNotificationController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: EmailVerificationNotificationController.url(options),
    method: 'post',
})

EmailVerificationNotificationController.definition = {
    methods: ["post"],
    url: '/api/v1/auth/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
EmailVerificationNotificationController.url = (options?: RouteQueryOptions) => {
    return EmailVerificationNotificationController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
EmailVerificationNotificationController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: EmailVerificationNotificationController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
    const EmailVerificationNotificationControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: EmailVerificationNotificationController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\EmailVerificationNotificationController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/EmailVerificationNotificationController.php:11
 * @route '/api/v1/auth/email/verification-notification'
 */
        EmailVerificationNotificationControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: EmailVerificationNotificationController.url(options),
            method: 'post',
        })
    
    EmailVerificationNotificationController.form = EmailVerificationNotificationControllerForm
export default EmailVerificationNotificationController