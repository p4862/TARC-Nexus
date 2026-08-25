import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
const NewPasswordController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: NewPasswordController.url(options),
    method: 'post',
})

NewPasswordController.definition = {
    methods: ["post"],
    url: '/api/v1/auth/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
NewPasswordController.url = (options?: RouteQueryOptions) => {
    return NewPasswordController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
NewPasswordController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: NewPasswordController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
    const NewPasswordControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: NewPasswordController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\NewPasswordController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/NewPasswordController.php:12
 * @route '/api/v1/auth/reset-password'
 */
        NewPasswordControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: NewPasswordController.url(options),
            method: 'post',
        })
    
    NewPasswordController.form = NewPasswordControllerForm
export default NewPasswordController