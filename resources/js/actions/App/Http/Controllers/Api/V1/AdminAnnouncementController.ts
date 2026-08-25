import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::index
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:17
 * @route '/api/v1/administrator/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/administrator/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::index
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:17
 * @route '/api/v1/administrator/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::index
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:17
 * @route '/api/v1/administrator/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::index
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:17
 * @route '/api/v1/administrator/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::index
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:17
 * @route '/api/v1/administrator/announcements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::index
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:17
 * @route '/api/v1/administrator/announcements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::index
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:17
 * @route '/api/v1/administrator/announcements'
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
/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::store
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:33
 * @route '/api/v1/administrator/announcements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/announcements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::store
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:33
 * @route '/api/v1/administrator/announcements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::store
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:33
 * @route '/api/v1/administrator/announcements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::store
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:33
 * @route '/api/v1/administrator/announcements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::store
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:33
 * @route '/api/v1/administrator/announcements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::update
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:50
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
export const update = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/v1/administrator/announcements/{announcement}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::update
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:50
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
update.url = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return update.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::update
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:50
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
update.patch = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::update
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:50
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
    const updateForm = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::update
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:50
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
        updateForm.patch = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::destroy
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:68
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
export const destroy = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/administrator/announcements/{announcement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::destroy
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:68
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
destroy.url = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return destroy.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::destroy
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:68
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
destroy.delete = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::destroy
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:68
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
    const destroyForm = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminAnnouncementController::destroy
 * @see app/Http/Controllers/Api/V1/AdminAnnouncementController.php:68
 * @route '/api/v1/administrator/announcements/{announcement}'
 */
        destroyForm.delete = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AdminAnnouncementController = { index, store, update, destroy }

export default AdminAnnouncementController