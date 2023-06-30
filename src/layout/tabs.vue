<template>
    <div class="tabs">
        <el-scrollbar ref="scrollbarDom" class="scroll-container tags-view-container" @wheel.passive="handleWhellScroll" @scroll="handleScroll">
            <tabsItem v-for="menu in tabsStorage" :key="menu.meta.title" :menu="menu" :active="activeMenu.path === menu.path" @close="delMenu(menu)" @reload="handlePageReload" />
        </el-scrollbar>
        <div class="handle">
            <div id="vueAdminBoxTabRefresh" @click="handlePageReload" />
            <div id="vueAdminBoxTabCloseSelf" @click="handleCloseCurrentRoute" />
            <div id="vueAdminBoxTabCloseOther" @click="handleCloseOtherRoute" />
            <div id="vueAdminBoxTabCloseAll" @click="handleCloseAllRoute" />
            <el-dropdown placement="bottom">
                <div class="el-dropdown-link">
                    <el-icon><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item class="tab-ddropdown-item" :icon="RefreshLeft" @click="handlePageReload">重新加载</el-dropdown-item>
                        <el-dropdown-item class="tab-ddropdown-item" :icon="CircleClose" :disabled="currentDisabled" @click="handleCloseCurrentRoute">关闭当前标签</el-dropdown-item>
                        <el-dropdown-item class="tab-ddropdown-item" :icon="CircleClose" :disabled="tabsStorage.length < 3" @click="handleCloseOtherRoute">关闭其他标签</el-dropdown-item>
                        <el-dropdown-item class="tab-ddropdown-item" :icon="CircleClose" :disabled="tabsStorage.length <= 1" @click="handleCloseAllRoute">关闭所有标签</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-tooltip class="item" effect="dark" :content="contentFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                <el-icon @click="handleFullscreen"><FullScreen /></el-icon>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowDown, CircleClose, FullScreen, RefreshLeft } from '@element-plus/icons'
import type { AnyFn } from '@vueuse/core'
import tabsItem from './tabs/item.vue'
import type { TabsType } from '@/composables/storage'

import { tabsStorage } from '@/composables/storage'

defineOptions({
    name: 'LayoutTabs',
})

const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()

const { contentFullScreen } = $(storeToRefs(globalStore))

const route = useRoute()
const router = useRouter()
const scrollbarDom = ref<InstanceType<typeof ElScrollbar>>()
const scrollLeft = ref(0)
const defaultMenu = {
    path: '/dashboard',
    meta: { title: '首页', hideClose: true },
} as TabsType
const currentDisabled = computed(() => route.path === defaultMenu.path)

let activeMenu: any = reactive({ path: '' })

if (tabsStorage.value?.length === 0) {
    // 判断之前有没有调用过
    addMenu(defaultMenu)
}

router.afterEach(() => {
    addMenu(route)
    initMenu(route)
})

// 全屏
function handleFullscreen() {
    globalStore.contentFullScreenChange(!contentFullScreen)
}
// 当前页面组件重新加载
function handlePageReload() {
    const self = route.matched[route.matched.length - 1].instances.default as ComponentPublicInstance & {
        handleReload: AnyFn
    }
    self.handleReload()
}

// 关闭当前标签，首页不关闭
function handleCloseCurrentRoute() {
    if (route.path !== defaultMenu.path) {
        const tab = document.getElementById('vueAdminBoxTabCloseSelf')
        const nextPath = tab?.getAttribute('nextPath')
        delMenu(route, nextPath)
    }
}
// 关闭除了当前标签之外的所有标签
function handleCloseOtherRoute() {
    tabsStorage.value = [defaultMenu]
    if (route.path !== defaultMenu.path)
        addMenu(route)

    setKeepAliveData()
}

// 关闭所有的标签，除了首页
function handleCloseAllRoute() {
    tabsStorage.value = [defaultMenu]
    setKeepAliveData()
    router.push(defaultMenu.path)
}

// 添加新的菜单项
function addMenu(menu: any) {
    const { path, meta, name } = menu
    if (meta.hideTabs || !meta.title)
        return

    const hasMenu = tabsStorage.value.some((obj: any) => {
        return obj.path === path
    })
    if (!hasMenu) {
        tabsStorage.value.push({
            path,
            meta,
            name,
        })
    }
}

// 删除菜单项
function delMenu(menu: any, nextPath?: string | null) {
    let index = 0
    if (!menu.meta.hideClose) {
        if (menu.meta.cache && menu.name)
            keepAliveStore.delKeepAliveComponentsName(menu.name)

        index = tabsStorage.value.findIndex((item: any) => item.path === menu.path)
        tabsStorage.value.splice(index, 1)
    }
    if (nextPath) {
        router.push(nextPath)
        return
    }
    if (menu.path === activeMenu.path)
        index - 1 > 0 ? router.push(tabsStorage.value[index - 1].path) : router.push(defaultMenu.path)
}

// 初始化activeMenu
function initMenu(menu: object) {
    activeMenu = menu
    nextTick(() => {
        setPosition()
    })
}
/** 设置当前滚动条应该在的位置 */
function setPosition() {
    if (scrollbarDom.value) {
        const domBox = {
            scrollbar: scrollbarDom.value.$el.querySelector('.el-scrollbar__wrap ') as HTMLDivElement,
            activeDom: scrollbarDom.value.$el.querySelector('.active') as HTMLDivElement,
            activeFather: scrollbarDom.value.$el.querySelector('.el-scrollbar__view') as HTMLDivElement,
        }
        let hasDoms = true
        Object.keys(domBox).forEach((dom) => {
            if (!domBox[dom as 'scrollbar' | 'activeDom' | 'activeFather'])
                hasDoms = false
        })
        if (!hasDoms)
            return

        const domData = {
            scrollbar: domBox.scrollbar.getBoundingClientRect(),
            activeDom: domBox.activeDom.getBoundingClientRect(),
            activeFather: domBox.activeFather.getBoundingClientRect(),
        }
        const num = domData.activeDom.x - domData.activeFather.x + (1 / 2) * domData.activeDom.width - (1 / 2) * domData.scrollbar.width
        domBox.scrollbar.scrollLeft = num
    }
}

// 配置需要缓存的数据
function setKeepAliveData() {
    const keepAliveNames: string[] = []
    tabsStorage.value.forEach((menu: any) => {
        menu.meta && menu.meta.cache && menu.name && keepAliveNames.push(menu.name)
    })
    keepAliveStore.setKeepAliveComponentsName(keepAliveNames)
}

/** 监听鼠标滚动事件 */
function handleWhellScroll(e: any) {
    let distance = 0
    const speed = 5
    if (e.wheelDelta > 30)
        distance = -10
    else if (e.wheelDelta < -30)
        distance = 10

    // console.log(scrollLeft.value + eventDelta / 4)
    scrollbarDom.value?.setScrollLeft(scrollLeft.value + distance * speed)
}

/** 监听滚动事件 */
function handleScroll({ scrollLeft: left }: { scrollLeft: number }) {
    scrollLeft.value = left
}

// 初始化时调用：1. 新增菜单 2. 初始化activeMenu
addMenu(route)
initMenu(route)
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background: var(--system-header-background);
    border-bottom: 1px solid var(--system-header-border-color);
    border-top: 1px solid var(--system-header-border-color);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    .handle {
        min-width: 95px;
        height: 100%;
        display: flex;
        align-items: center;
        .el-dropdown-link {
            margin-top: 5px;
            border-left: 1px solid var(--system-header-border-color);
            height: 25px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        i {
            color: var(--system-header-text-color);
        }
    }
}
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    :deep(.el-scrollbar__bar) {
        bottom: 0px;
    }
    :deep(.el-scrollbar__wrap) {
        height: 49px;
    }
}
.tags-view-container {
    height: 34px;
    flex: 1;
    width: 100%;
    display: flex;
}
.el-icon-full-screen {
    cursor: pointer;
    &:hover {
        background: rgba(0, 0, 0, 0.025);
    }
    &:focus {
        outline: none;
    }
}
.tab-ddropdown-item {
    display: flex;
    align-items: center;
}
</style>
