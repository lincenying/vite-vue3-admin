import type { AnyFn } from '@vueuse/core'
import type { RoleListType, UserListType } from './system.types'
import type { TableListType } from '~/types/table.types'

/** 全局弹窗数据 */
export interface GlobalDialogLayer<T = Objable> {
    /** 是否显示弹窗 */
    show: boolean
    /** 弹窗标题 */
    title: string
    /** 是否显示按钮 */
    showButton?: boolean
    /** 是否显示取消按钮 */
    showCancel?: boolean
    /** 数据 */
    row?: T
    /** 弹窗宽度 */
    width?: string
    /** 禁用按钮 */
    disabledBtn: boolean
    /** loading按钮 */
    loadingBtn: boolean
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

export interface GlobalTableProps<T> {
    propKey?: T
    /** 表格数据 */
    data?: DataType<T>[]
    /** 是否显示序号, 默认值: false */
    showIndex?: boolean
    /** 是否显示多选框, 默认值: false */
    showSelection?: boolean
    /** 是否显示分页, 默认值: true */
    showPage?: boolean
    /** 分页数据, 默认值: { index: 1, size: 20, total: 0 } */
    page?: GlobalTablePage
    /** 设置分页的组件, 默认值: 'total, sizes, prev, pager, next, jumper' */
    pageLayout?: string
    /** 设置分页下拉框可选的值, 默认值: [10, 20, 50, 100] */
    pageSizes?: number[]
    /** 其他 el-table 属性 */
    tableConfig?: Record<string, any>
    /** 其他 el-pagination 属性 */
    pageConfig?: Record<string, any>
}

export interface TypeMap {
    user: UserListType
    table: TableListType
    role: RoleListType
}

export type DataType<Key> = Key extends keyof TypeMap ? TypeMap[Key] : unknown
