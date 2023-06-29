<template>
    <el-container style="height: 100vh">
        <div v-show="!isCollapse && !contentFullScreen" class="mask" @click="hideMenu" />
        <el-aside v-show="!contentFullScreen" :width="isCollapse ? '60px' : '250px'" :class="isCollapse ? 'hide-aside' : 'show-side'">
            <LayoutLogo v-if="showLogo" />
            <LayoutMenu />
        </el-aside>
        <el-container>
            <el-header v-show="!contentFullScreen">
                <LayoutHeader />
            </el-header>
            <LayoutTabs v-show="showTabs" />
            <el-main>
                <router-view v-slot="{ Component, route }">
                    <transition :name="route.meta.transition || 'fade-transform'" mode="out-in">
                        <keep-alive v-if="keepAliveComponentsName" :include="keepAliveComponentsName">
                            <component :is="Component" :key="route.fullPath" />
                        </keep-alive>
                        <component :is="Component" v-else :key="route.fullPath" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import LayoutMenu from './menu.vue'
import LayoutLogo from './logo.vue'
import LayoutHeader from './header.vue'
import LayoutTabs from './tabs.vue'

defineOptions({
    name: 'LayoutIndex',
})

const keepAliveStore = useKeepAliveStore()
const globalStore = useGlobalStore()

const { isCollapse, contentFullScreen, showLogo, showTabs } = $(storeToRefs(globalStore))
const { keepAliveComponentsName } = $(storeToRefs(keepAliveStore))

// 页面宽度变化监听后执行的方法
function resizeHandler() {
    if (document.body.clientWidth <= 1000 && !isCollapse)
        globalStore.isCollapseChange(true)
    else if (document.body.clientWidth > 1000 && isCollapse)
        globalStore.isCollapseChange(false)
}
// 初始化调用
resizeHandler()
// beforeMount
onBeforeMount(() => {
    // 监听页面变化
    useEventListener('resize', resizeHandler)
})
// methods
// 隐藏菜单
function hideMenu() {
    globalStore.isCollapseChange(true)
}
</script>

<style lang="scss" scoped>
.el-header {
    padding-left: 0;
    padding-right: 0;
}
.el-aside {
    display: flex;
    flex-direction: column;
    transition: 0.2s;
    overflow-x: hidden;
    transition: 0.3s;
    &::-webkit-scrollbar {
        width: 0 !important;
    }
}
.el-main {
    background-color: var(--system-container-background);
    height: 100%;
    padding: 0;
    overflow-x: hidden;
}
:deep(.el-main-box) {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
@media screen and (max-width: 1000px) {
    .el-aside {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
        &.hide-aside {
            left: -250px;
        }
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
    }
}
</style>
