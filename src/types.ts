import type { ElTree } from 'element-plus'
import type { GlobalTablePage } from './components/components.types'

export type TreeInstance = InstanceType<typeof ElTree>

export interface UpdatePageType {
    key: keyof GlobalTablePage
    value: any
}

export interface CategoryType {
    id: number
    name: string
}

export interface TreeType {
    label: string
    id: number
    children: {
        label: string
        id: number
    }
}

export interface IndexCardType {
    id?: number
    name: string
    data: string
    color: string
    icon: string
}

export interface TableListType {
    id: number
    name: string
    number: number
    choose: number
    radio: number
    chooseName?: string | number
    radioName?: string | number
}

export interface CardListType {
    id: number
    image: string
    title: string
    time: string
}

export interface UserListType {
    id?: string
    name: string
    password: string
    token: string
    status?: number
    isAdmin?: number
    info: {
        name: string
    }
    loading?: boolean
}

export interface SettingOption {
    name: string
    value: boolean
    store: 'showLogo' | 'showTabs' | 'expandOneMenu'
}
