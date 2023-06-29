import { StorageSerializers } from '@vueuse/core'
import type { AppState } from '@/pinia/use-global-store'
import type { KeepAliveStoreType } from '@/pinia/use-keep-alive-store'
import type { UserState } from '@/pinia/use-user-store'

export const globalStorage = useStorage<Nullable<AppState>>('__global__', null, undefined, { serializer: StorageSerializers.object })
export const keepAliveStorage = useStorage<Nullable<KeepAliveStoreType>>('__keepAlive__', null, undefined, { serializer: StorageSerializers.object })
export const userStorage = useStorage<Nullable<UserState>>('__user__', null, undefined, { serializer: StorageSerializers.object })
