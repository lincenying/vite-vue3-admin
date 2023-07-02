import { acceptHMRUpdate } from 'pinia'
import { userStorage } from '@/composables/storage'

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
    async function login(params: { name: string; password: string }) {
        const { code, data } = await $api.post<any>('/user/login', params)
        if (code === 200 && data) {
            await getInfo({ token: data.token })
            return data.token
        }
        return null
    }
    // get user info after user logined
    async function getInfo(params: { token: string }) {
        const { code, data } = await $api.post<any>('/user/info', params)
        if (code === 200) {
            infoChange(data.info)
            return data.info
        }
        return null
    }

    // login out the system after user click the loginOut button
    async function loginOut() {
        await $api.post('/user/out')

        localStorage.removeItem('tabs')
        localStorage.removeItem('vuex')
        sessionStorage.removeItem('vuex')
        location.reload()
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
