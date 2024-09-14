<template>
    <router-view v-if="Route.path === '/login'" v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
    </router-view>
    <el-container v-else class="layout-box" h-100vh>
        <div v-show="!isCollapse && !contentFullScreen" class="mask" @click="hideMenu" />
        <el-aside v-show="!contentFullScreen" :width="isCollapse ? '60px' : '250px'" :class="isCollapse ? 'hide-aside' : 'show-side'">
            <layout-logo v-if="showLogo" />
            <layout-menu />
        </el-aside>
        <el-container>
            <el-header v-show="!contentFullScreen">
                <layout-header />
            </el-header>
            <layout-tabs v-show="showTabs" />
            <el-main>
                <router-view v-slot="{ Component, route }">
                    <transition :name="route.meta.transition || 'fade-transform'" mode="out-in">
                        <keep-alive v-if="keepAliveComponentsName" :include="keepAliveComponentsName as string[]">
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
import layoutHeader from '~/layout/header.vue'
import layoutLogo from '~/layout/logo.vue'
import layoutMenu from '~/layout/menu.vue'
import layoutTabs from '~/layout/tabs.vue'

defineOptions({
    name: 'LayoutIndex',
})

const keepAliveStore = useKeepAliveStore()
const globalStore = useGlobalStore()

const Route = useRoute()

const { isCollapse, contentFullScreen, showLogo, showTabs } = $(storeToRefs(globalStore))
const { keepAliveComponentsName } = $(storeToRefs(keepAliveStore))

// 页面宽度变化监听后执行的方法
function resizeHandler() {
    if (document.body.clientWidth <= 1000 && !isCollapse) {
        globalStore.$patch({ isCollapse: true })
    }
    else if (document.body.clientWidth > 1000 && isCollapse) {
        globalStore.$patch({ isCollapse: false })
    }
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
    globalStore.$patch({ isCollapse: true })
}
</script>
