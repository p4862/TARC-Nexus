import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
const PublicHomepageController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PublicHomepageController.url(options),
    method: 'get',
})

PublicHomepageController.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/homepage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
PublicHomepageController.url = (options?: RouteQueryOptions) => {
    return PublicHomepageController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
PublicHomepageController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PublicHomepageController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
PublicHomepageController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PublicHomepageController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
    const PublicHomepageControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: PublicHomepageController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
        PublicHomepageControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PublicHomepageController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
        PublicHomepageControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PublicHomepageController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    PublicHomepageController.form = PublicHomepageControllerForm
export default PublicHomepageController