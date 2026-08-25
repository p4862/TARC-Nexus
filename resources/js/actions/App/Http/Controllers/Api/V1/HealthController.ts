import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
const HealthController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HealthController.url(options),
    method: 'get',
})

HealthController.definition = {
    methods: ["get","head"],
    url: '/api/v1/health',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
HealthController.url = (options?: RouteQueryOptions) => {
    return HealthController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
HealthController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HealthController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
HealthController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: HealthController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
    const HealthControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: HealthController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
        HealthControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: HealthController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
        HealthControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: HealthController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    HealthController.form = HealthControllerForm
export default HealthController