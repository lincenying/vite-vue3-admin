import type { AnyFn } from '@vueuse/core'

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
