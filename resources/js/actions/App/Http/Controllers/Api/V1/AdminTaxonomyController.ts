import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:34
 * @route '/api/v1/administrator/categories'
 */
export const storeCategory = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCategory.url(options),
    method: 'post',
})

storeCategory.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:34
 * @route '/api/v1/administrator/categories'
 */
storeCategory.url = (options?: RouteQueryOptions) => {
    return storeCategory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:34
 * @route '/api/v1/administrator/categories'
 */
storeCategory.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCategory.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:34
 * @route '/api/v1/administrator/categories'
 */
    const storeCategoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeCategory.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:34
 * @route '/api/v1/administrator/categories'
 */
        storeCategoryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeCategory.url(options),
            method: 'post',
        })
    
    storeCategory.form = storeCategoryForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:48
 * @route '/api/v1/administrator/categories/{category}'
 */
export const updateCategory = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateCategory.url(args, options),
    method: 'patch',
})

updateCategory.definition = {
    methods: ["patch"],
    url: '/api/v1/administrator/categories/{category}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:48
 * @route '/api/v1/administrator/categories/{category}'
 */
updateCategory.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return updateCategory.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:48
 * @route '/api/v1/administrator/categories/{category}'
 */
updateCategory.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateCategory.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:48
 * @route '/api/v1/administrator/categories/{category}'
 */
    const updateCategoryForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateCategory.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:48
 * @route '/api/v1/administrator/categories/{category}'
 */
        updateCategoryForm.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateCategory.form = updateCategoryForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:62
 * @route '/api/v1/administrator/categories/{category}'
 */
export const destroyCategory = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCategory.url(args, options),
    method: 'delete',
})

destroyCategory.definition = {
    methods: ["delete"],
    url: '/api/v1/administrator/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:62
 * @route '/api/v1/administrator/categories/{category}'
 */
destroyCategory.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return destroyCategory.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:62
 * @route '/api/v1/administrator/categories/{category}'
 */
destroyCategory.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCategory.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:62
 * @route '/api/v1/administrator/categories/{category}'
 */
    const destroyCategoryForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyCategory.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyCategory
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:62
 * @route '/api/v1/administrator/categories/{category}'
 */
        destroyCategoryForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyCategory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyCategory.form = destroyCategoryForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
export const storeTechnology = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTechnology.url(options),
    method: 'post',
})

storeTechnology.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/technologies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
storeTechnology.url = (options?: RouteQueryOptions) => {
    return storeTechnology.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
storeTechnology.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTechnology.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
    const storeTechnologyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeTechnology.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:75
 * @route '/api/v1/administrator/technologies'
 */
        storeTechnologyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeTechnology.url(options),
            method: 'post',
        })
    
    storeTechnology.form = storeTechnologyForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
export const updateTechnology = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateTechnology.url(args, options),
    method: 'patch',
})

updateTechnology.definition = {
    methods: ["patch"],
    url: '/api/v1/administrator/technologies/{technology}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
updateTechnology.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technology: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { technology: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    technology: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        technology: typeof args.technology === 'object'
                ? args.technology.id
                : args.technology,
                }

    return updateTechnology.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
updateTechnology.patch = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateTechnology.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
    const updateTechnologyForm = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateTechnology.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:89
 * @route '/api/v1/administrator/technologies/{technology}'
 */
        updateTechnologyForm.patch = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateTechnology.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateTechnology.form = updateTechnologyForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
export const destroyTechnology = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyTechnology.url(args, options),
    method: 'delete',
})

destroyTechnology.definition = {
    methods: ["delete"],
    url: '/api/v1/administrator/technologies/{technology}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
destroyTechnology.url = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technology: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { technology: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    technology: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        technology: typeof args.technology === 'object'
                ? args.technology.id
                : args.technology,
                }

    return destroyTechnology.definition.url
            .replace('{technology}', parsedArgs.technology.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
destroyTechnology.delete = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyTechnology.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
    const destroyTechnologyForm = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyTechnology.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroyTechnology
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:103
 * @route '/api/v1/administrator/technologies/{technology}'
 */
        destroyTechnologyForm.delete = (args: { technology: number | { id: number } } | [technology: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyTechnology.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyTechnology.form = destroyTechnologyForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
export const storeSdg = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSdg.url(options),
    method: 'post',
})

storeSdg.definition = {
    methods: ["post"],
    url: '/api/v1/administrator/sdgs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
storeSdg.url = (options?: RouteQueryOptions) => {
    return storeSdg.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
storeSdg.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSdg.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
    const storeSdgForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeSdg.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::storeSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:116
 * @route '/api/v1/administrator/sdgs'
 */
        storeSdgForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeSdg.url(options),
            method: 'post',
        })
    
    storeSdg.form = storeSdgForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
export const updateSdg = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSdg.url(args, options),
    method: 'patch',
})

updateSdg.definition = {
    methods: ["patch"],
    url: '/api/v1/administrator/sdgs/{sdg}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
updateSdg.url = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sdg: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sdg: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sdg: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sdg: typeof args.sdg === 'object'
                ? args.sdg.id
                : args.sdg,
                }

    return updateSdg.definition.url
            .replace('{sdg}', parsedArgs.sdg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
updateSdg.patch = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSdg.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
    const updateSdgForm = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSdg.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::updateSdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:130
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
        updateSdgForm.patch = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSdg.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateSdg.form = updateSdgForm
/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroySdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
export const destroySdg = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySdg.url(args, options),
    method: 'delete',
})

destroySdg.definition = {
    methods: ["delete"],
    url: '/api/v1/administrator/sdgs/{sdg}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroySdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
destroySdg.url = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sdg: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sdg: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sdg: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sdg: typeof args.sdg === 'object'
                ? args.sdg.id
                : args.sdg,
                }

    return destroySdg.definition.url
            .replace('{sdg}', parsedArgs.sdg.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroySdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
destroySdg.delete = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySdg.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroySdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
    const destroySdgForm = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroySdg.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\AdminTaxonomyController::destroySdg
 * @see app/Http/Controllers/Api/V1/AdminTaxonomyController.php:144
 * @route '/api/v1/administrator/sdgs/{sdg}'
 */
        destroySdgForm.delete = (args: { sdg: number | { id: number } } | [sdg: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroySdg.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroySdg.form = destroySdgForm
const AdminTaxonomyController = { index, storeCategory, updateCategory, destroyCategory, storeTechnology, updateTechnology, destroyTechnology, storeSdg, updateSdg, destroySdg }

export default AdminTaxonomyController