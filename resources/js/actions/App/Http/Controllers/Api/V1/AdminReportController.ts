import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
const AdminReportController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminReportController.url(options),
    method: 'get',
})

AdminReportController.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
AdminReportController.url = (options?: RouteQueryOptions) => {
    return AdminReportController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
AdminReportController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminReportController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
AdminReportController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminReportController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
    const AdminReportControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AdminReportController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
        AdminReportControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminReportController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
        AdminReportControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminReportController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AdminReportController.form = AdminReportControllerForm
export default AdminReportController