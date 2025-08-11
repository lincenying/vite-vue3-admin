import type { AnyFn } from '@vueuse/core'
import type { RoleListType, TableListType, UserListType } from '~/types/global.types'

export interface GlobalDialogLayer<T = Objable> {
    show: boolean
    title: string
    showButton?: boolean
    row?: T
    width?: string
    [propName: string]: any
}

export interface LayerType {
    close: AnyFn
}

export interface GlobalTablePage {
    index: number
    size: number
    total: number
}

export interface GlobalTableProps {
    data: any[]
    select?: any[]
    showIndex?: boolean
    showSelection?: boolean
    showPage?: boolean
    page: GlobalTablePage
    pageLayout?: string
    pageSizes?: number[]
}

interface TypeMap {
    user: UserListType
    table: TableListType
    role: RoleListType
}

export type DataType<Key> = Key extends keyof TypeMap ? TypeMap[Key] : unknown
