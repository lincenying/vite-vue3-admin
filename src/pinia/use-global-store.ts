import { acceptHMRUpdate } from 'pinia'
import { globalStorage } from '@/composables/storage'

interface Option<T> {
    name: keyof optionKey<T>
    value: optionValue<T>
}

type optionKey<T> = {
    [name in keyof T]: string
}

interface optionValue<T> {
    value: T[keyof T]
}

export interface ThemeState {
    style: string
    primaryColor: string
    primaryTextColor: string
    menuType: string
}

export interface AppState {
    isCollapse: boolean
    contentFullScreen: boolean
    showLogo: boolean
    fixedTop: boolean
    showTabs: boolean
    expandOneMenu: boolean
    elementSize: '' | 'default' | 'small' | 'large'
    lang: string
    theme: {
        state: ThemeState
    }
    menuList: Array<unknown>
    [key: string]: unknown
}

const useGlobalStore = defineStore('globalStore', () => {
    const state: AppState = reactive(globalStorage.value || {
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
        menuList: [],
    })

    function isCollapseChange(type: boolean) {
        state.isCollapse = type
    }
    function contentFullScreenChange(type: boolean) {
        state.contentFullScreen = type
    }
    function menuListChange(arr: []) {
        state.menuList = arr
    }
    function stateChange(option: Option<AppState>) {
        state[option.name] = option.value
    }

    return {
        ...toRefs(state),
        isCollapseChange,
        contentFullScreenChange,
        menuListChange,
        stateChange,
    }
})

useGlobalStore(piniaInit).$subscribe((_mutation, state) => {
    globalStorage.value = state
})

export default useGlobalStore
export const globalStoreWithout = () => useGlobalStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
