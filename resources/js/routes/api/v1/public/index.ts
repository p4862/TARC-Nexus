import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
import projects from './projects'
import categories from './categories'
import sdgs from './sdgs'
import technologies from './technologies'
/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
export const homepage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: homepage.url(options),
    method: 'get',
})

homepage.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/homepage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
homepage.url = (options?: RouteQueryOptions) => {
    return homepage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
homepage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: homepage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
homepage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: homepage.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
    const homepageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: homepage.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
        homepageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: homepage.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicHomepageController::__invoke
 * @see app/Http/Controllers/Api/V1/PublicHomepageController.php:12
 * @route '/api/v1/public/homepage'
 */
        homepageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: homepage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    homepage.form = homepageForm
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
export const taxonomies = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: taxonomies.url(options),
    method: 'get',
})

taxonomies.definition = {
    methods: ["get","head"],
    url: '/api/v1/public/taxonomies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
taxonomies.url = (options?: RouteQueryOptions) => {
    return taxonomies.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
taxonomies.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: taxonomies.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
taxonomies.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: taxonomies.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
    const taxonomiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: taxonomies.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
 */
        taxonomiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: taxonomies.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PublicDiscoveryController::taxonomies
 * @see app/Http/Controllers/Api/V1/PublicDiscoveryController.php:16
 * @route '/api/v1/public/taxonomies'
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
const publicMethod = {
    homepage: Object.assign(homepage, homepage),
taxonomies: Object.assign(taxonomies, taxonomies),
projects: Object.assign(projects, projects),
categories: Object.assign(categories, categories),
sdgs: Object.assign(sdgs, sdgs),
technologies: Object.assign(technologies, technologies),
}

export default publicMethod