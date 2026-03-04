import mitt from 'mitt'

/** 未登录, 或者登录失效 */
export const noAuth = useEventBus('no-auth')
/** 需要登录 */
export const needLogin = useEventBus('need-login')
/** 接口报错 */
export const apiError = useEventBus<string>('api-error')

export const cancelInterval = useEventBus<number>('cancel-interval')

// 定义事件总线
// const changeCategory = useEventBus('change-category')

// 监听函数
/**
function listener(event: number) {
    console.log(`news: ${event}`)
}
 */
// 监听事件
// const unsubscribe = changeCategory.on(listener)

// 触发事件
// changeCategory.emit(123)

// 注销监听器
// unsubscribe()
// 或者
// changeCategory.off(listener)

// 清除所有监听器
// changeCategory.reset()

interface EmitterEvents {
    'reflashRoleUserList': { tableId: string } | undefined
    'no-auth': void
    'need-login': void
    'api-error': string
    'cancel-interval': void
    'nprogress-start': string
    'nprogress-done': string
}

// 添加索引签名以满足mitt的类型约束
type EmitterEventsMap = Record<keyof EmitterEvents, any> & Record<string, unknown>

const emitter = mitt<EmitterEventsMap>()

// 创建并暴露mitt
export default emitter

// 监听事件
// emitter.on('change-category', (categoryId) => { })

// 触发事件
// emitter.emit('change-category', 1)

// 清理事件
// emitter.all.clear()

// 移除事件
// emitter.off('change-category')
