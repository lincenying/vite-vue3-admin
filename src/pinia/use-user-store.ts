import { acceptHMRUpdate } from 'pinia'
import { userStorage } from '@/composables/storage'

import { getInfoApi, loginApi, loginOutApi } from '@/api/user'

export interface UserState {
    token: string
    info: Obj
}

const useUserStore = defineStore('userStore', () => {
    const state: UserState = reactive(userStorage.value || {
        token: '', // 登录token
        info: {}, // 用户信息
    })

    function tokenChange(token: string) {
        state.token = token
    }
    function infoChange(info: Obj) {
        state.info = info
    }

    // login by login.vue
    function login(params: any) {
        return new Promise((resolve, reject) => {
            loginApi(params)
                .then((res) => {
                    tokenChange(res.data.token)
                    getInfo({ token: res.data.token })
                        .then(() => {
                            resolve(res.data.token)
                        })
                }).catch((err) => {
                    reject(err)
                })
        })
    }
    // get user info after user logined
    function getInfo(params: any) {
        return new Promise((resolve) => {
            getInfoApi(params)
                .then((res) => {
                    infoChange(res.data.info)
                    resolve(res.data.info)
                })
        })
    }

    // login out the system after user click the loginOut button
    function loginOut() {
        loginOutApi()
            .then(() => {

            })
            .catch(() => {

            })
            .finally(() => {
                localStorage.removeItem('tabs')
                localStorage.removeItem('vuex')
                sessionStorage.removeItem('vuex')
                location.reload()
            })
    }

    return {
        ...toRefs(state),
        tokenChange,
        infoChange,
        login,
        getInfo,
        loginOut,
    }
})

useUserStore(piniaInit).$subscribe((_mutation, state) => {
    userStorage.value = state
})

export default useUserStore
export const userStoreWithout = () => useUserStore(piniaInit)

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
