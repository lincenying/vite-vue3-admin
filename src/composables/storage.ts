import type { RouteRecordName } from 'vue-router'
import type { GlobalState, KeepAliveState, UserState } from '~/stores/store.types'

import { StorageSerializers } from '@vueuse/core'

export interface TabsType {
    path: string
    meta: {
        title: string
        label?: string
        hideClose?: boolean
        hideTabs?: boolean
        cache?: boolean
    }
    name?: RouteRecordName | Nullable<string>
}

export const globalStorage = useStorage<Nullable<GlobalState>>('__global__', null, undefined, { serializer: StorageSerializers.object })
export const keepAliveStorage = useStorage<Nullable<KeepAliveState>>('__keepAlive__', null, undefined, { serializer: StorageSerializers.object })
export const userStorage = useStorage<Nullable<UserState>>('__user__', null, undefined, { serializer: StorageSerializers.object })

export const tabsStorage = useStorage<TabsType[]>('__tabs__', [], undefined, { serializer: StorageSerializers.object })
