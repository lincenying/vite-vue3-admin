import type { TabsType } from '~/composables/storage'

export interface ThemeColorProps {
    active: string
    activeTextColor: string
    tip: string
    color: string
    textColor: string
}

export interface ThemeIconProps {
    name: string
    active: string
    menu: string
    logo: string
    header: string
    main: string
    tip: string
    activeColor: string
}

export interface MenuItemProps {
    menu: TabsType
    active: boolean
}
