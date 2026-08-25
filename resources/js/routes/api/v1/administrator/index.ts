import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
import users from './users'
import taxonomies from './taxonomies'
import categories from './categories'
import technologies from './technologies'
import sdgs from './sdgs'
import projects from './projects'
import announcements from './announcements'
/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminDashboardController.php:13
 * @route '/api/v1/administrator/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminReportController::__invoke
 * @see app/Http/Controllers/Api/V1/AdminReportController.php:13
 * @route '/api/v1/administrator/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
const administrator = {
    dashboard: Object.assign(dashboard, dashboard),
users: Object.assign(users, users),
taxonomies: Object.assign(taxonomies, taxonomies),
categories: Object.assign(categories, categories),
technologies: Object.assign(technologies, technologies),
sdgs: Object.assign(sdgs, sdgs),
projects: Object.assign(projects, projects),
announcements: Object.assign(announcements, announcements),
reports: Object.assign(reports, reports),
}

export default administrator