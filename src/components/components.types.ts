export interface LayoutDialogLayer<T = Obj> {
    show: boolean
    title: string
    showButton?: boolean
    row?: T
    width?: string
    [propName: string]: any
}
export interface LayoutDialogProps {
    layer: LayoutDialogLayer
}
export interface LayerType {
    close: Function
}

export interface LayoutTablePage {
    index: number
    size: number
    total: number
}

export interface LayoutTableProps {
    data: any[]
    select?: any[]
    showIndex?: boolean
    showSelection: boolean
    showPage?: boolean
    page: LayoutTablePage
    pageLayout?: string
    pageSizes?: number[]
}
