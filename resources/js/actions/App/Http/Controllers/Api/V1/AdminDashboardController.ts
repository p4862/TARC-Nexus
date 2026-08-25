import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
const AdminDashboardController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController.url(options),
    method: 'get',
})

AdminDashboardController.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
AdminDashboardController.url = (options?: RouteQueryOptions) => {
    return AdminDashboardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
AdminDashboardController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
AdminDashboardController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminDashboardController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
    const AdminDashboardControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AdminDashboardController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
        AdminDashboardControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
        AdminDashboardControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AdminDashboardController.form = AdminDashboardControllerForm
export default AdminDashboardController