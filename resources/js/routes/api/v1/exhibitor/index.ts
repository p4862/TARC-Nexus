import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
import projects from './projects'
/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
export const taxonomies = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: taxonomies.url(options),
    method: 'get',
})

taxonomies.definition = {
    methods: ["get","head"],
    url: '/api/v1/exhibitor/taxonomies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
taxonomies.url = (options?: RouteQueryOptions) => {
    return taxonomies.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
taxonomies.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: taxonomies.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
taxonomies.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: taxonomies.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
    const taxonomiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: taxonomies.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
        taxonomiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: taxonomies.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\TaxonomyController::__invoke
 * @see app/Http/Controllers/Api/V1/TaxonomyController.php:11
 * @route '/api/v1/exhibitor/taxonomies'
 */
        taxonomiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: taxonomies.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    taxonomies.form = taxonomiesForm
/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/api/v1/exhibitor/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ExhibitorAnalyticsController::__invoke
 * @see app/Http/Controllers/Api/V1/ExhibitorAnalyticsController.php:14
 * @route '/api/v1/exhibitor/analytics'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
const exhibitor = {
    taxonomies: Object.assign(taxonomies, taxonomies),
projects: Object.assign(projects, projects),
analytics: Object.assign(analytics, analytics),
}

export default exhibitor