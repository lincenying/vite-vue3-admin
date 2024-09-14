import type { DefineComponent } from 'vue'

// 1. 用于解决keep-alive需要name的问题，动态生成随机name供keep-alive使用
// 2. 用于解决transition动画内部结点只能为根元素的问题，单文件可写多结点
import { createVNode } from 'vue'
import NProgress from '~/utils/nprogress'
import reload from './reload.vue'

export function createNameComponent(component: () => Promise<any>): () => Promise<DefineComponent<Objable, Objable, any>> {
    return () => {
        return new Promise((resolve) => {
            component().then((comm: DefineComponent<Objable, Objable, any>) => {
                const name = `${comm.default.name || 'vue3Admin'}$${Date.now()}`
                const tempComm = defineComponent({
                    name,
                    setup() {
                        const isReload = ref(false)
                        let timeOut: Nullable<NodeJS.Timeout> = null
                        const handleReload = () => {
                            isReload.value = true
                            timeOut && clearTimeout(timeOut)
                            NProgress.start()
                            timeOut = setTimeout(() => {
                                nextTick(() => {
                                    NProgress.done()
                                    isReload.value = false
                                })
                            }, 260)
                        }
                        return {
                            isReload,
                            handleReload,
                        }
                    },
                    render() {
                        if (this.isReload) {
                            return h('div', { class: 'el-main-box' }, [h(reload)])
                        }
                        else {
                            return h('div', { class: 'el-main-box' }, [createVNode(comm.default)])
                        }
                    },
                })
                resolve(tempComm)
            })
        })
    }
}
