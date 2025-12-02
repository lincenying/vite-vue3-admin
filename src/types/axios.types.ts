import type { AxiosRequestConfig, Method } from 'axios'

export type Methods = 'get' | 'post' | 'delete' | 'put'

export interface ServiceType {
    url: string
    method: Method
    data: Objable
    /** 是否验证code, 默认:true */
    checkCode?: boolean
    /** 请求头 */
    headers?: AxiosRequestConfig['headers']
    /** 超时时间 */
    timeout?: number
    /** 其他axios配置 */
    otherConfig?: AxiosRequestConfig
    [key: string]: any
}
