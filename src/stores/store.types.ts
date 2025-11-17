import type { RouteRecordName } from 'vue-router'

export interface GlobalStateOption<T> {
    name: keyof GlobalStateOptionKey<T>
    value: GlobalStateOptionValue<T>
}

export type GlobalStateOptionKey<T> = {
    [name in keyof T]: string
}

export interface GlobalStateOptionValue<T> {
    value: T[keyof T]
}

export interface ThemeState {
    style: string
    primaryColor: string
    primaryTextColor: string
    menuType: string
}

export interface GlobalState {
    /** 是否收起导航 */
    isCollapse: boolean
    /** 内容窗口是否全屏 */
    contentFullScreen: boolean
    /** 是否显示logo */
    showLogo: boolean
    /** 是否固定顶部 */
    fixedTop: boolean
    /** 是否显示标签栏 */
    showTabs: boolean
    /** 是否只保持一个子菜单的展开 */
    expandOneMenu: boolean
    /** elemnt-plus 元素尺寸 */
    elementSize: '' | 'default' | 'small' | 'large'
    lang: string
    theme: {
        state: ThemeState
    }
}

export interface KeepAliveState {
    keepAliveComponentsName: RouteRecordName[]
}

export interface UserState {
    token: string
    info: Objable
}
