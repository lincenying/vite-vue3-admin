import type { FetchOptions } from 'ofetch'
import type { ServiceType } from '~/types/axios.types'
import { isFormData } from '@lincy/utils'
import { ofetch } from 'ofetch'
import qs from 'qs'
import { getBaseUrl, isSSR } from '~/config'

type Methods = 'get' | 'post' | 'delete' | 'put'

// 模块级共享的请求取消 Map
const pendingRequest = new Map<string, AbortController>()
const baseURL = getBaseUrl()

export class FetchApiClient {
    public abortKey = ''
    private needSignal: boolean

    constructor(needSignal = false) {
        this.needSignal = needSignal
    }

    getAbourtKey() {
        return this.abortKey
    }

    generateRequestKey(config: ServiceType) {
        const { url, method, data = {} } = config
        return [url, method, qs.stringify(data), Date.now()].join('&')
    }

    abortRequest(abortKey?: string) {
        const key = abortKey || this.abortKey
        if (pendingRequest.has(key)) {
            const controller = pendingRequest.get(key)
            controller?.abort('取消请求')
            pendingRequest.delete(key)
        }
    }

    // 请求方法
    get = <T, U = Objable>(url: string, data?: Objable, options?: FetchOptions) => {
        return this.RESTful<T, U>(url, 'get', data, options)
    }

    post = <T, U = Objable>(url: string, data?: Objable, options?: FetchOptions) => {
        return this.RESTful<T, U>(url, 'post', data, options)
    }

    put = <T, U = Objable>(url: string, data?: Objable, options?: FetchOptions) => {
        return this.RESTful<T, U>(url, 'put', data, options)
    }

    delete = <T, U = Objable>(url: string, data?: Objable, options?: FetchOptions) => {
        return this.RESTful<T, U>(url, 'delete', data, options)
    }

    RESTful = async <T, U = Objable>(
        url: string,
        method: Methods = 'get',
        data?: Objable,
        options?: FetchOptions,
    ) => {
        return await this.fetch<T, U>(url, method, data, options)
    }

    fetch = async <T, U = Objable>(
        url: string,
        method: Methods = 'get',
        data?: Objable,
        options?: FetchOptions,
    ) => {
        let signal: AbortSignal | undefined
        if (this.needSignal) {
            this.abortKey = this.generateRequestKey({ url, method, data })
            const controller = new AbortController()
            signal = controller.signal
            pendingRequest.set(this.abortKey, controller)
        }

        const apiFetch = ofetch.create({
            baseURL,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })

        return apiFetch(url, {
            method,
            query: method === 'get' ? data : undefined,
            body: method === 'get' ? undefined : data,
            timeout: 5000,
            signal,
            onRequest({ request, options }) {
                emitter.emit('nprogress-start')
                console.log('[fetch request]', request, options)
            },
            onRequestError({ error }) {
                if (!isSSR) {
                    error && emitter.emit('api-error', 'Sorry, The Data Request Failed')
                }
                console.log('[fetch response error]', error)
            },
            onResponse({ response }) {
                if (response._data.code === 401) {
                    emitter.emit('need-login')
                    return (response._data = null)
                }
                if (response._data.code !== 200) {
                    if (!isSSR) {
                        emitter.emit(
                            'api-error',
                            response._data.message || response._data.error || '请求失败',
                        )
                    }
                    return response._data
                }
                emitter.emit('nprogress-done')
                console.log(`%c[fetch: ${baseURL + url}] >> `, 'color: red', response._data)
                return (response._data = response._data || 'success')
            },
            onResponseError({ response }) {
                emitter.emit('nprogress-done')
                console.log('[fetch response error]', response.status)
            },
            ...options,
            headers: {
                ...(isFormData(data) ? {} : { 'Content-Type': 'application/json' }),
                ...options?.headers,
            },
        }) as Promise<ResponseData<T> & U>
    }
}

// 为了兼容原有的 useApi 函数，提供一个工厂函数（可选）
export const useApi = (needSignal = false) => new FetchApiClient(needSignal)

// 预定义实例
export const $api = new FetchApiClient()
export const $fetch = new FetchApiClient(true)

// 挂载到 window（如果存在）
if (typeof window !== 'undefined') {
    window.$$api = $fetch
}
