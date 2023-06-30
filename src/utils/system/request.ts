import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from '@/config/element'

const baseURL: string = import.meta.env.VITE_BASE_URL

const service: AxiosInstance = axios.create({
    baseURL,
    timeout: 5000,
})

// 请求前的统一处理
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // JWT鉴权处理
        if (userStorage.value && userStorage.value.token)
            config.headers.token = userStorage.value.token

        return config
    },
    (error: AxiosError) => {
        console.log(error) // for debug
        return Promise.reject(error)
    },
)

service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        if (res.code === 200) {
            return res
        }
        else {
            showError(res)
            return Promise.reject(res)
        }
    },
    (error: AxiosError) => {
        console.log(error) // for debug
        const badMessage: any = error.message || error
        const code = Number.parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''))
        showError({ code, message: badMessage })
        return Promise.reject(error)
    },
)

// 错误处理
function showError(error: any) {
    // token过期，清除本地数据，并跳转至登录页面
    if (error.code === 403) {
    // to re-login

        userStoreWithout().loginOut()
    }
    else {
        ElMessage({
            message: error.msg || error.message || '服务异常',
            type: 'error',
            duration: 3 * 1000,
        })
    }
}

export default service
