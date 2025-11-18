import type { GlobalTablePage } from './components.types'

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
    id?: number
    name?: string
    number?: number
    choose?: number
    radio?: number
    chooseName?: string | number
    radioName?: string | number
}

export type DeptListType = Partial<Pick<TreeType, 'label' | 'id'>>

export interface CardListType {
    id: number
    image: string
    title: string
    time: string
    loading?: boolean
}
