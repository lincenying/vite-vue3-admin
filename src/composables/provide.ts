import type { AnyFn } from '@vueuse/core'
import type { ICategory, ITree } from '~/types/table.types'

export const activeCategoryKey = Symbol('activeCategoryKey') as InjectionKey<Ref<ICategory>>
export const updateActiveCategoryKey = Symbol('UpdateActiveCategoryKey') as InjectionKey<AnyFn>
export const activeTreeKey = Symbol('activeTreeKey') as InjectionKey<Ref<ITree>>
export const updateActiveTreeKey = Symbol('UpdateActiveTreeKey') as InjectionKey<AnyFn>
