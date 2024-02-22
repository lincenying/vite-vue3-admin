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
}

export interface KeepAliveState {
    keepAliveComponentsName: RouteRecordName[]
}

export interface UserState {
    token: string
    info: Objable
}
