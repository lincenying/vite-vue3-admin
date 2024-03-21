/**
 * Null 或者 Undefined 或者 T
 */
declare type Nullable<T> = T | null | undefined
/**
 * 非 Null 类型
 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/**
 * 数组<T> 或者 T
 */
declare type Arrayable<T> = T | T[]
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Objable<T = any> = Record<string, T>
/**
 * Function
 */
declare type Fn<T = void> = () => T
/**
 * 任意函数
 */
declare type AnyFn<T = any> = (...args: any[]) => T

declare type PromiseFn<T> = (...args: any[]) => Promise<T>
/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>

declare interface ResDataLists<T> {
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
    message: string
    info?: string
    [propName: string]: any
}

type Methods = 'get' | 'post' | 'delete' | 'put'

declare interface ApiType {
    get: <T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T>>
    get: <T, U = Objable>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T> & U>
    post: <T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T>>
    post: <T, U = Objable>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T> & U>
    put: <T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T>>
    put: <T, U = Objable>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T> & U>
    delete: <T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T>>
    delete: <T, U = Objable>(url: string, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T> & U>
    downFile: (url: string, method: Methods, data?: Objable) => Promise<any>
    RESTful: <T>(url: string, method: Methods, data?: Objable, header?: Objable, checkCode?: boolean) => Promise<ResponseData<T>>
    $RESTful: <T>(url: string, method: Methods, data?: Objable, header?: Objable) => Promise<ResponseData<T>>
}

declare interface Window {
    $$lock?: boolean
    $$api: ApiType
    $$time: NodeJS.Timeout
    axios: import('axios').AxiosStatic
}
