import { acceptHMRUpdate } from 'pinia'

export interface KeepAliveStoreType {
    keepAliveComponentsName: string[]
}

const useKeepAliveStore = defineStore('keepAliveStore', () => {
    const state = reactive<KeepAliveStoreType>({
        keepAliveComponentsName: [],
    })

    // 重置，Push, splice keep-alive对象
    function setKeepAliveComponentsName(nameArr: string[]) {
        state.keepAliveComponentsName = nameArr
    }
    function addKeepAliveComponentsName(name: string) {
        state.keepAliveComponentsName.push(name)
    }
    function delKeepAliveComponentsName(name: string) {
        const key = state.keepAliveComponentsName.indexOf(name)
        if (key !== -1) {
            state.keepAliveComponentsName.splice(key, 1)
            console.log(state.keepAliveComponentsName)
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

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useKeepAliveStore, import.meta.hot))
