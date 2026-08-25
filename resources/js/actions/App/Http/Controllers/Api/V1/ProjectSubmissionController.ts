import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ProjectSubmissionController::__invoke
 * @see app/Http/Controllers/Api/V1/ProjectSubmissionController.php:13
 * @route '/api/v1/exhibitor/projects/{project}/submit'
 */
const ProjectSubmissionController = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProjectSubmissionController.url(args, options),
    method: 'post',
})

ProjectSubmissionController.definition = {
    methods: ["post"],
    url: '/api/v1/exhibitor/projects/{project}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ProjectSubmissionController::__invoke
 * @see app/Http/Controllers/Api/V1/ProjectSubmissionController.php:13
 * @route '/api/v1/exhibitor/projects/{project}/submit'
 */
ProjectSubmissionController.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                }

    return ProjectSubmissionController.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProjectSubmissionController::__invoke
 * @see app/Http/Controllers/Api/V1/ProjectSubmissionController.php:13
 * @route '/api/v1/exhibitor/projects/{project}/submit'
 */
ProjectSubmissionController.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProjectSubmissionController.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\ProjectSubmissionController::__invoke
 * @see app/Http/Controllers/Api/V1/ProjectSubmissionController.php:13
 * @route '/api/v1/exhibitor/projects/{project}/submit'
 */
    const ProjectSubmissionControllerForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ProjectSubmissionController.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ProjectSubmissionController::__invoke
 * @see app/Http/Controllers/Api/V1/ProjectSubmissionController.php:13
 * @route '/api/v1/exhibitor/projects/{project}/submit'
 */
        ProjectSubmissionControllerForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ProjectSubmissionController.url(args, options),
            method: 'post',
        })
    
    ProjectSubmissionController.form = ProjectSubmissionControllerForm
export default ProjectSubmissionController