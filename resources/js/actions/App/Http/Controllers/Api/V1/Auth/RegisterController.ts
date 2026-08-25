import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
const RegisterController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RegisterController.url(options),
    method: 'post',
})

RegisterController.definition = {
    methods: ["post"],
    url: '/api/v1/auth/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
RegisterController.url = (options?: RouteQueryOptions) => {
    return RegisterController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
RegisterController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RegisterController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
    const RegisterControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: RegisterController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\Auth\RegisterController::__invoke
 * @see app/Http/Controllers/Api/V1/Auth/RegisterController.php:13
 * @route '/api/v1/auth/register'
 */
        RegisterControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RegisterController.url(options),
            method: 'post',
        })
    
    RegisterController.form = RegisterControllerForm
export default RegisterController