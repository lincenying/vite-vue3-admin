import type { GlobalState } from './store.types'

import { acceptHMRUpdate } from 'pinia'
import { globalStorage } from '~/composables/storage'

const useGlobalStore = defineStore('globalStore', () => {
    const state: GlobalState = reactive(globalStorage.value || {
        isCollapse: false, // 侧边栏是否收缩展示
        contentFullScreen: false, // 内容是否可全屏展示
        showLogo: true, // 是否显示Logo
        fixedTop: false, // 是否固定顶部, todo，暂未使用
        showTabs: true, // 是否显示导航历史
        expandOneMenu: true, // 一次是否只能展开一个菜单
        elementSize: 'default', // element默认尺寸，支持官网'large / default /small'小参数
        lang: '', // 默认采用的国际化方案,初次进入，采用浏览器当前设置的语言，默认采用中文
        theme: {
            state: {
                style: 'default',
                primaryColor: '#409eff',
                primaryTextColor: '',
                menuType: 'side',
            },
        },
    })

    return {
        ...toRefs(state),
    }
})

useGlobalStore(piniaInit).$subscribe((_mutation, state) => {
    globalStorage.value = state
})

export default useGlobalStore
export const globalStoreWithout = () => useGlobalStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
