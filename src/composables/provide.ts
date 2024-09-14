import type { AnyFn } from '@vueuse/core'
import type { CategoryType, TreeType } from '~/types'

export const activeCategoryKey = Symbol('activeCategoryKey') as InjectionKey<Ref<CategoryType>>
export const updateActiveCategoryKey = Symbol('UpdateActiveCategoryKey') as InjectionKey<AnyFn>

export const activeTreeKey = Symbol('activeTreeKey') as InjectionKey<Ref<TreeType>>
export const updateActiveTreeKey = Symbol('UpdateActiveTreeKey') as InjectionKey<AnyFn>
