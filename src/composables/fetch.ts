import type { FetchOptions } from 'ofetch'
import type { ServiceType } from '~/types/axios.types'
import { isFormData } from '@lincy/utils'
import { ofetch } from 'ofetch'
import qs from 'qs'
import { getBaseUrl, isSSR } from '~/config'

const pendingRequest = new Map<string, AbortController>()

const baseURL = getBaseUrl()

/**
 * ofetch Api 封装
 * ```
    get<T>(url: string, params?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
    post<T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
    put<T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
 * ```
 */
export const useApi: (needSignal?: boolean) => FetchApiType = (needSignal = false) => {
    const apiFetch = ofetch.create({
        baseURL,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    })

    return {
        /** 取消请求的Key */
        abortKey: '',
        getAbourtKey() {
            return this.abortKey
        },
        /** 生成request的唯一的标识 */
        generateRequestKey(config: ServiceType) {
            // 通过url，method，data生成唯一key
            const { url, method, data } = config
            return [url, method, qs.stringify(data), Date.now()].join('&')
        },

        /** 取消请求 */
        abortRequest(abortKey?: string) {
            abortKey = abortKey || this.abortKey
            if (pendingRequest.has(abortKey)) {
                const controller = pendingRequest.get(abortKey)
                controller?.abort('取消请求') // 触发取消请求
                pendingRequest.delete(abortKey) // 删除cancelKey
            }
        },
        post(url: string, data?: Objable, options?: FetchOptions) {
            return this.RESTful(url, 'post', data, options)
        },
        get(url: string, data?: Objable, options?: FetchOptions) {
            return this.RESTful(url, 'get', data, options)
        },
        put(url: string, data?: Objable, options?: FetchOptions) {
            return this.RESTful(url, 'put', data, options)
        },
        delete(url: string, data?: Objable, options?: FetchOptions) {
            return this.RESTful(url, 'delete', data, options)
        },
        async RESTful(url, method = 'get', data, options?: FetchOptions) {
            return await this.fetch(url, method, data, options)
        },
        async fetch(url, method = 'get', data, options?: FetchOptions) {
            let signal: AbortSignal | undefined
            if (needSignal) {
                this.abortKey = this.generateRequestKey({ url, method, data })
                const controller = new AbortController()
                signal = controller.signal

                pendingRequest.set(this.abortKey, controller)
            }

            return apiFetch(url, {
                method,
                query: method === 'get' ? data : undefined,
                body: method === 'get' ? undefined : data,
                timeout: 5000, // Timeout after 10 seconds
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
                        return response._data = null
                    }
                    if (response._data.code !== 200) {
                        if (!isSSR) {
                            emitter.emit('api-error', response._data.message || response._data.error || '请求失败')
                        }
                        return response._data
                    }
                    emitter.emit('nprogress-done')
                    console.log(`%c[fetch: ${baseURL + url}] >> `, 'color: red', response._data)
                    return response._data = response._data || 'success'
                },
                onResponseError({ response }) {
                    // Log error
                    // ElMessage.error('[fetch response error] Sorry, The Data Request Failed')
                    emitter.emit('nprogress-done')
                    console.log('[fetch response error]', response.status)
                },
                ...options,
                headers: {
                    ...isFormData(data) ? { } : { 'Content-Type': 'application/json' },
                    ...options?.headers,
                },
            })
        },
    }
}
if (typeof window !== 'undefined') {
    window.$$api = useApi(true)
}
export const $api = useApi()
export const $fetch = useApi(true)
