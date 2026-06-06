import type { GlobalTablePage } from './components.types'

export interface IUpdatePage {
    key: keyof GlobalTablePage
    value: any
}

export interface ICategory {
    id: number
    name: string
}

export interface ITree {
    label: string
    id: number
    children: {
        label: string
        id: number
    }
}

export interface IIndexCard {
    id?: number
    name: string
    data: string
    color: string
    icon: string
}

export interface ITableList {
    id?: number
    name?: string
    number?: number
    choose?: number
    radio?: number
    chooseName?: string | number
    radioName?: string | number
}

export type IDeptList = Partial<Pick<ITree, 'label' | 'id'>>

export interface ICardList {
    id: number
    image: string
    title: string
    time: string
    loading?: boolean
}
