import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
const ExhibitorAnalyticsController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ExhibitorAnalyticsController.url(options),
    method: 'get',
})

ExhibitorAnalyticsController.definition = {
    methods: ["get","head"],
    url: '/api/v1/exhibitor/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
ExhibitorAnalyticsController.url = (options?: RouteQueryOptions) => {
    return ExhibitorAnalyticsController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
ExhibitorAnalyticsController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ExhibitorAnalyticsController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
ExhibitorAnalyticsController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ExhibitorAnalyticsController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
    const ExhibitorAnalyticsControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ExhibitorAnalyticsController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
        ExhibitorAnalyticsControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ExhibitorAnalyticsController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
        ExhibitorAnalyticsControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ExhibitorAnalyticsController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ExhibitorAnalyticsController.form = ExhibitorAnalyticsControllerForm
export default ExhibitorAnalyticsController