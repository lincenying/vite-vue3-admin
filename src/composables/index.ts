export function changeTitle(name: string) {
    document.title = `${name}-后台管理系统`
}

/** 关闭当前标签 */
export function closeCurrentTab(nextPath?: string) {
    /** 拿到tab组件 */
    const tab = document.getElementById('vueAdminBoxTabCloseSelf')
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
    const tab = document.getElementById('vueAdminBoxTabCloseOther')
    /** 触发tab事件点击 */
    tab?.click()
}

/** 关闭所有标签 */
export function closeAllTab() {
    /** 拿到tab组件 */
    const tab = document.getElementById('vueAdminBoxTabCloseAll')
    /** 触发tab事件点击 */
    tab?.click()
}

/** 刷新当前标签 */
export function refreshCurrentTab() {
    /** 拿到tab组件 */
    const tab = document.getElementById('vueAdminBoxTabRefresh')
    /** 触发tab事件点击 */
    tab?.click()
}
