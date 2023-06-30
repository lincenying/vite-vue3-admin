/* eslint-disable no-unused-vars */

/** Null 或者 T */
declare type Nullable<T> = T | null
/** 非 Null 类型 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/** Undefined 或者 T */
declare type UnfAble<T> = T | undefined
/** 键为字符串, 值为 Any 的对象 */
declare type Obj = Record<string, any>
/** 键为字符串, 值为 T 的对象 */
declare type ObjT<T> = Record<string, T>

declare interface ResponseDataLists<T> {
    list: T
    pager: {
        page: number
        pageSize: number
        total: number
    }
}

/**
 * 接口返回模板
 * ```
 * {
    data: T
    code: number
    message: string
    info?: string
 * }
 * ```
 */
declare interface ResponseData<T> {
    data: T
    code: number
    msg: string
    info?: string
}

declare interface ApiType {
    get<T>(url: string, params?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    post<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    put<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    downFile(url: string, method: 'get' | 'post', data?: Obj): Promise<any>
    RESTful<T>(
        url: string,
        method: 'get' | 'post' | 'delete' | 'put',
        data?: Obj,
        header?: Obj,
        checkCode?: boolean
    ): Promise<ResponseData<T>>
    $RESTful<T>(url: string, method: 'get' | 'post' | 'delete' | 'put', data?: Obj, header?: Obj): Promise<ResponseData<T>>
}

declare interface Window {
    $$lock?: boolean
    $$api: ApiType
    randomArray: (lower: number, upper: number, length: number) => number[]
    $$myChart: any
    $$time: NodeJS.Timeout
    axios: any
}
