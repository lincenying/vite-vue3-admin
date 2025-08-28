import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

import type { ServiceType } from '~/types/fetch.types'
import axios from 'axios'
import { userStorage } from '~/composables/storage'

window.axios = axios

const headers: AxiosRequestConfig['headers'] = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
}

const baseConfig: AxiosRequestConfig = {
    headers,
    timeout: 5000,
    withCredentials: false,
}

if (import.meta.env.VITE_APP_ENV === 'production') {
    baseConfig.timeout = 300000
}

axios.interceptors.request.use(
    config => config,
    error => Promise.resolve(error.response || error),
)

axios.interceptors.response.use(
    response => response,
    (error) => {
        const response = {} as AxiosResponse
        response.config = error.config
        response.data = null
        response.headers = error.config.headers
        response.status = error.code
        response.statusText = error.message
        response.request = error.request
        return Promise.resolve(response)
    },
)

/**
 * axios Api 封装
 */
export class ApiClient {
    parseArgs(method: Method, ...args: any[]) {
        const firstParam = args[0] as ServiceType
        if (typeof firstParam === 'object' && firstParam) {
            return this.RESTful({ ...firstParam, method })
        }

        const params = {} as ServiceType

        const keys = ['url', 'data', 'headers', 'otherConfig', 'checkCode']
        for (const [index, key] of keys.entries()) {
            params[key as keyof ServiceType] = args[index]
        }
        return this.RESTful({ ...params, method })
    }

    post<T = void>(url: string, data?: Objable, headers?: AxiosRequestConfig['headers'], otherConfig?: AxiosRequestConfig, checkCode?: boolean): Promise<ResponseData<T>>
    post<T = void>(options: ServiceType): Promise<ResponseData<T>>
    post(...args: any[]) {
        return this.parseArgs('post', ...args)
    }

    get<T = void>(url: string, data?: Objable, headers?: AxiosRequestConfig['headers'], otherConfig?: AxiosRequestConfig, checkCode?: boolean): Promise<ResponseData<T>>
    get<T = void>(options: ServiceType): Promise<ResponseData<T>>
    get(...args: any[]) {
        return this.parseArgs('get', ...args)
    }

    put<T = void>(url: string, data?: Objable, headers?: AxiosRequestConfig['headers'], otherConfig?: AxiosRequestConfig, checkCode?: boolean): Promise<ResponseData<T>>
    put<T = void>(options: ServiceType): Promise<ResponseData<T>>
    put(...args: any[]) {
        return this.parseArgs('get', ...args)
    }

    delete<T = void>(url: string, data?: Objable, headers?: AxiosRequestConfig['headers'], otherConfig?: AxiosRequestConfig, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T = void>(options: ServiceType): Promise<ResponseData<T>>
    delete(...args: any[]) {
        return this.parseArgs('get', ...args)
    }
    /**
     * download
    $api.post({
        url: '/user/info',
        method: 'post',
        data: params,
        checkCode: false,
        otherConfig: {
            responseType: 'arraybuffer',
        },
    })
     */

    async RESTful(options: ServiceType) {
        const xhr = await this.$RESTful(options)
        if (options.checkCode ?? true) {
            return this.checkCodeFn(xhr)
        }
        return xhr
    }

    async $RESTful(options: ServiceType) {
        let { url, method = 'get', data, header, otherConfig = {} } = options

        url = import.meta.env.VITE_APP_API + url

        const config: AxiosRequestConfig = {
            ...baseConfig,
            headers: {
                ...baseConfig.headers,
                ...header,
            },
            method,
            url,
            ...otherConfig,
        }
        if (userStorage.value && userStorage.value.token) {
            config.headers!.Authorization
                = `Bearer ${userStorage.value.token}`
        }

        if (method === 'get') {
            config.params = data
        }
        else {
            config.data = data
        }

        if (url.includes('NoTimeout')) {
            config.timeout = 9999999
        }
        const response = await axios(config)
        return this.checkStatus(response)
    }

    checkStatus(
        response: AxiosResponse<ResponseData<any>>,
    ): ResponseData<any> {
        if (response.status === 200 || response.status === 304) {
            return response.data
        }
        if (response.status === 401) {
            return {
                code: 401,
                info: response.statusText || response.toString(),
                data: response.statusText || response.toString(),
                message: `您还没有登录, 或者登录超时!`,
            }
        }
        return {
            code: -404,
            info: response.statusText || response.toString(),
            data: response.statusText || response.toString(),
            message: `接口返回数据错误, 错误代码: ${response.status || '未知'}`,
        }
    }

    checkCodeFn(data: ResponseData<any>) {
        const code = [0, 200, 1000]
        if (data.code === 401) {
            userStorage.value = null
            const pathname = encodeURIComponent(window.location.pathname)
            if (!window.$$lock) {
                window.$$lock = true
                loginMsgBox('当前登录状态已失效, 请重新登录', pathname)
            }
        }
        else if (!code.includes(Number(data.code))) {
            showMsg(data.message)
        }
        else {
            data.code = 200
        }
        return data
    }
}

window.$$api = new ApiClient()
export const $api = new ApiClient()
