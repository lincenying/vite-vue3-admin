import type { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios'

import axios from 'axios'
import { userStorage } from '~/composables/storage'

window.axios = axios

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
}

const baseConfig = {
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
    error => Promise.resolve(error.response || error),
)

function checkStatus(response: AxiosResponse<ResponseData<any>>): ResponseData<any> {
    if (response && (response.status === 200 || response.status === 304)) {
        return response.data
    }

    return {
        code: -404,
        info: response.statusText || response.toString(),
        data: response.statusText || response.toString(),
        message: `接口返回数据错误, 错误代码: ${response.status}`,
    }
}

function checkCodeFn(data: ResponseData<any>) {
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

/**
 * axios Api 封装
 * ```
    get<T>(url: string, params?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
    post<T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
    put<T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T>(url: string, data?: Objable, header?: Objable, checkCode?: boolean): Promise<ResponseData<T>>
 * ```
 */
const api: ApiType = {
    post(url: string, data?: Objable, header?: Objable, checkCode = true) {
        return this.RESTful(url, 'post', data, header, checkCode)
    },
    get(url: string, data?: Objable, header?: Objable, checkCode = true) {
        return this.RESTful(url, 'get', data, header, checkCode)
    },
    put(url: string, data?: Objable, header?: Objable, checkCode = true) {
        return this.RESTful(url, 'put', data, header, checkCode)
    },
    delete(url: string, data?: Objable, header?: Objable, checkCode = true) {
        return this.RESTful(url, 'delete', data, header, checkCode)
    },
    async downFile(url, method = 'get', data) {
        const config: AxiosRequestConfig = {
            ...baseConfig,
            responseType: 'arraybuffer',
            method,
            url: import.meta.env.VITE_APP_API + url,
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
        return response
    },

    async RESTful(url, method = 'get', data, header, checkCode) {
        const xhr = await this.$RESTful(url, method, data, header)
        if (checkCode) {
            return checkCodeFn(xhr)
        }
        return xhr
    },
    async $RESTful(url, method = 'get', data, header) {
        // if (url.split('/')[1] === '' || url.split('/')[1] === '') {
        // } else {
        url = import.meta.env.VITE_APP_API + url
        // }
        const config: AxiosRequestConfig = {
            ...baseConfig,
            headers: {
                ...baseConfig.headers,
                ...header,
            },
            method,
            url,
        }
        if (userStorage.value && userStorage.value.token) {
            (config.headers as AxiosHeaders).Authorization = `Bearer ${userStorage.value.token}`
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
        return checkStatus(response)
    },
}
window.$$api = api
export const $api = api
