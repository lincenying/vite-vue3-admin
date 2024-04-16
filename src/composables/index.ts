/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @description
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 * @example
 * ```
 * const Fn = useLockFn(async (key) => {
 *  console.log(key)
 * }
 *
 * <div v-on:click="Fn(123)"></div>
 * ```
 */
export function useLockFn(fn: AnyFn, autoUnlock: boolean | 'auto' = 'auto') {
    const lock = ref(false)
    return async (...args: any[]) => {
        if (lock.value) {
            return
        }
        lock.value = true
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) {
                lock.value = false
            }
        }
        catch (e) {
            lock.value = false
            throw e
        }
    }
}

export function changeTitle(name: string) {
    document.title = `${name}-后台管理系统`
}

/** 关闭当前标签 */
export function closeCurrentTab(nextPath?: string) {
    /** 拿到tab组件 */
    const tab = document.getElementById('boxTabCloseSelf')
    if (nextPath) {
    /** 设置下一个tab的路径 */
        tab?.setAttribute('nextpath', nextPath)
    }
    /** 触发tab事件点击 */
    tab?.click()
    if (nextPath) {
        setTimeout(() => {
            /** 清除下一个tab的路径 */
            tab?.removeAttribute('nextpath')
        }, 100)
    }
}

/** 关闭其他标签 */
export function closeOtherTab() {
    /** 拿到tab组件 */
    const tab = document.getElementById('boxTabCloseOther')
    /** 触发tab事件点击 */
    tab?.click()
}

/** 关闭所有标签 */
export function closeAllTab() {
    /** 拿到tab组件 */
    const tab = document.getElementById('boxTabCloseAll')
    /** 触发tab事件点击 */
    tab?.click()
}

/** 刷新当前标签 */
export function refreshCurrentTab() {
    /** 拿到tab组件 */
    const tab = document.getElementById('boxTabRefresh')
    /** 触发tab事件点击 */
    tab?.click()
}

/**
 * 将多维数组拍平
 * @param arr 多维数组
 * @param key 子数组键名
 * @returns 一维数组
 * @example
 * ```js
 * var a = [{
    a: 1,
    children: [{
        a: 11,
    }]
}]
// ===>
[{"a":1,"children":[]},{"a":11,"children":[]}]
```
 */
export function flattenArray(arr: any[], key: string) {
    let result: any[] = []
    // 使用递归遍历数组的每个元素
    arr.forEach((item) => {
        // 将当前元素的属性a添加到结果数组中
        result.push({
            ...item,
            [key]: [],
        })
        // 如果当前元素存在子数组，则递归调用flattenArray函数进行处理
        if (item[key] && item[key].length > 0) {
            const childrenArray = flattenArray(item[key], key)
            // 将子数组的结果合并到结果数组中
            result = result.concat(childrenArray)
        }
    })
    return result
}
