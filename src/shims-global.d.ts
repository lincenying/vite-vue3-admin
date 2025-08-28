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

/** 根据指定的键将对象的部分属性变为可选 */
type PartialByKeys<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]-?: T[P]
} & {
    [P in K]?: T[P]
}

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

declare interface Window {
    $$lock?: boolean
    $$api: ApiType
    $$time: NodeJS.Timeout
    axios: import('axios').AxiosStatic
}
