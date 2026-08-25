import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import publicMethod from './public'
import engagement from './engagement'
import auth from './auth'
import profile from './profile'
import exhibitor from './exhibitor'
import administrator from './administrator'
/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
export const health = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})

health.definition = {
    methods: ["get","head"],
    url: '/api/v1/health',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
health.url = (options?: RouteQueryOptions) => {
    return health.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
health.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
health.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: health.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
    const healthForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: health.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
        healthForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: health.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\HealthController::__invoke
 * @see app/Http/Controllers/Api/V1/HealthController.php:10
 * @route '/api/v1/health'
 */
        healthForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: health.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    health.form = healthForm
const v1 = {
    health: Object.assign(health, health),
public: Object.assign(publicMethod, publicMethod),
engagement: Object.assign(engagement, engagement),
auth: Object.assign(auth, auth),
profile: Object.assign(profile, profile),
exhibitor: Object.assign(exhibitor, exhibitor),
administrator: Object.assign(administrator, administrator),
}

export default v1