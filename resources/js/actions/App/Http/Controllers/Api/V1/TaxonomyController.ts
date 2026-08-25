import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
const TaxonomyController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TaxonomyController.url(options),
    method: 'get',
})

TaxonomyController.definition = {
    methods: ["get","head"],
    url: '/api/v1/exhibitor/taxonomies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
TaxonomyController.url = (options?: RouteQueryOptions) => {
    return TaxonomyController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
TaxonomyController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TaxonomyController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
TaxonomyController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: TaxonomyController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
    const TaxonomyControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: TaxonomyController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
        TaxonomyControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TaxonomyController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
        TaxonomyControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TaxonomyController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    TaxonomyController.form = TaxonomyControllerForm
export default TaxonomyController