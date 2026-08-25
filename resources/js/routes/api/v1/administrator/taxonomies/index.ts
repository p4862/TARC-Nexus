import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::index
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:23
 * @route '/api/v1/administrator/taxonomies'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/taxonomies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::index
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:23
 * @route '/api/v1/administrator/taxonomies'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::index
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:23
 * @route '/api/v1/administrator/taxonomies'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::index
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:23
 * @route '/api/v1/administrator/taxonomies'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::index
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:23
 * @route '/api/v1/administrator/taxonomies'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::index
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:23
 * @route '/api/v1/administrator/taxonomies'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::index
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:23
 * @route '/api/v1/administrator/taxonomies'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const taxonomies = {
    index: Object.assign(index, index),
}

export default taxonomies