<template>
    <div class="layout-tabs">
        <el-scrollbar ref="scrollbarDom" class="scroll-container tags-view-container" @wheel.passive="handleWhellScroll" @scroll="handleScroll">
            <tabsItem
                v-for="menu in tabsStorage" :key="menu.meta.title"
                :menu="menu" :active="activeMenu.path === menu.path"
                @close="delMenu(menu)" @reload="handlePageReload"
            />
        </el-scrollbar>
        <div class="layout-tabs-handle">
            <div id="boxTabRefresh" @click="handlePageReload" />
            <div id="boxTabCloseSelf" @click="handleCloseCurrentRoute" />
            <div id="boxTabCloseOther" @click="handleCloseOtherRoute" />
            <div id="boxTabCloseAll" @click="handleCloseAllRoute" />
            <el-dropdown placement="bottom">
                <div class="el-dropdown-link">
                    <el-icon><i-ep-arrow-down /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item class="tab-ddropdown-item" @click="handlePageReload">
                            <el-icon slots="icon" class="mr-5px"><i-ad-reload-outlined /></el-icon>重新加载
                        </el-dropdown-item>
                        <el-dropdown-item class="tab-ddropdown-item" :disabled="currentDisabled" @click="handleCloseCurrentRoute">
                            <el-icon slots="icon" class="mr-5px"><i-ep-CircleClose /></el-icon>关闭当前标签
                        </el-dropdown-item>
                        <el-dropdown-item class="tab-ddropdown-item" :disabled="tabsStorage.length < 3" @click="handleCloseOtherRoute">
                            <el-icon slots="icon" class="mr-5px"><i-ep-CircleClose /></el-icon>关闭其他标签
                        </el-dropdown-item>
                        <el-dropdown-item class="tab-ddropdown-item" :disabled="tabsStorage.length <= 1" @click="handleCloseAllRoute">
                            <el-icon slots="icon" class="mr-5px"><i-ep-CircleClose /></el-icon>关闭所有标签
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-tooltip class="item" effect="dark" :content="contentFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                <el-icon @click="handleFullscreen"><i-ep-full-screen /></el-icon>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { AnyFn } from '@vueuse/core'
import type { ScrollbarInstance } from 'element-plus'
import type { RouteRecordName } from 'vue-router'
import type { TabsType } from '~/composables/storage'

import { tabsStorage } from '~/composables/storage'
import tabsItem from '~/layout/tabs/item.vue'

defineOptions({
    name: 'LayoutTabs',
})

const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()

const { contentFullScreen } = $(storeToRefs(globalStore))

const route = useRoute()
const router = useRouter()
const scrollbarDom = ref<ScrollbarInstance>()
const scrollLeft = ref(0)

const defaultMenu: TabsType = {
    path: '/dashboard',
    meta: { title: '首页', hideClose: true },
}

const currentDisabled = computed(() => route.path === defaultMenu.path)

let activeMenu: TabsType = reactive({
    path: '',
    meta: { title: '', hideClose: true },
})

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
    globalStore.$patch({ contentFullScreen: !contentFullScreen })
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
        const tabElement = document.getElementById('boxTabCloseSelf')
        const nextPath = tabElement?.getAttribute('nextPath')
        delMenu(route, nextPath)
    }
}
// 关闭除了当前标签之外的所有标签
function handleCloseOtherRoute() {
    tabsStorage.value = [defaultMenu]
    if (route.path !== defaultMenu.path) {
        addMenu(route)
    }

    setKeepAliveData()
}

// 关闭所有的标签，除了首页
function handleCloseAllRoute() {
    tabsStorage.value = [defaultMenu]
    setKeepAliveData()
    router.push(defaultMenu.path)
}

// 添加新的菜单项
function addMenu(menu: TabsType) {
    const { path, meta, name } = menu
    if (meta.hideTabs || !meta.title) {
        return
    }

    const hasMenu = tabsStorage.value.some((obj) => {
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
function delMenu(menu: TabsType, nextPath?: string | null) {
    let index = 0
    if (!menu.meta.hideClose) {
        if (menu.meta.cache && menu.name) {
            keepAliveStore.delKeepAliveComponentsName(menu.name)
        }

        index = tabsStorage.value.findIndex(item => item.path === menu.path)
        tabsStorage.value.splice(index, 1)
    }
    if (nextPath) {
        router.push(nextPath)
        return
    }
    if (menu.path === activeMenu.path) {
        index - 1 > 0 ? router.push(tabsStorage.value[index - 1].path) : router.push(defaultMenu.path)
    }
}

// 初始化activeMenu
function initMenu(menu: TabsType) {
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
            if (!domBox[dom as 'scrollbar' | 'activeDom' | 'activeFather']) {
                hasDoms = false
            }
        })
        if (!hasDoms) {
            return
        }

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
    const keepAliveNames: RouteRecordName[] = []
    tabsStorage.value.forEach((menu) => {
        if (menu.meta && menu.meta.cache && menu.name) {
            keepAliveNames.push(menu.name)
        }
    })
    keepAliveStore.setKeepAliveComponentsName(keepAliveNames)
}

/** 监听鼠标滚动事件 */
function handleWhellScroll(e: WheelEvent) {
    let distance = 0
    const speed = 5
    if (-e.deltaY > 30) {
        distance = -10
    }
    else if (-e.deltaY < -30) {
        distance = 10
    }

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
