import type { RouteRecordName } from 'vue-router'
import type { KeepAliveState } from './store.types'

import { acceptHMRUpdate } from 'pinia'

const useKeepAliveStore = defineStore('keepAliveStore', () => {
    const state: KeepAliveState = reactive({
        keepAliveComponentsName: [],
    })

    // 重置，Push, splice keep-alive对象
    function setKeepAliveComponentsName(nameArr: RouteRecordName[]) {
        state.keepAliveComponentsName = nameArr
    }
    function addKeepAliveComponentsName(name: RouteRecordName) {
        state.keepAliveComponentsName.push(name)
    }
    function delKeepAliveComponentsName(name: RouteRecordName) {
        const key = state.keepAliveComponentsName.indexOf(name)
        if (key !== -1) {
            state.keepAliveComponentsName.splice(key, 1)
        }
    }

    return {
        ...toRefs(state),
        setKeepAliveComponentsName,
        addKeepAliveComponentsName,
        delKeepAliveComponentsName,
    }
})

export default useKeepAliveStore
export const keepAliveStoreWithout = () => useKeepAliveStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useKeepAliveStore, import.meta.hot))
}
