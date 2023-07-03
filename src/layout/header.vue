<template>
    <header class="layout-header">
        <div class="left-box">
            <!-- 收缩按钮 -->
            <div class="menu-icon" @click="opendStateChange">
                <i class="iconfont head-fold" :class="isCollapse ? 'icon-s-unfold' : 'icon-s-fold'" />
            </div>
            <Breadcrumb />
        </div>
        <div class="right-box">
            <!-- 快捷功能按钮 -->
            <div class="function-list">
                <div class="function-list-item hidden-sm-and-down"><FullScreen /></div>
                <div class="function-list-item hidden-sm-and-down"><LayoutTheme /></div>
                <div class="function-list-item hidden-sm-and-down"><Github /></div>
            </div>
            <!-- 用户信息 -->
            <div class="user-info">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        管理员
                        <i class="iconfont icon-down" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleModifyPass">修改密码</el-dropdown-item>
                            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <dialog-password v-if="layer.show" :layer="layer" @update="(payload: boolean) => layer.show = payload" />
        </div>
    </header>
</template>

<script lang="ts" setup>
import Breadcrumb from './header/breadcrumb.vue'
import dialogPassword from './header/dialog-password.vue'
import FullScreen from './header/fullscreen.vue'
import LayoutTheme from './header/layout-theme.vue'
import Github from './header/github.vue'
import type { GlobalDialogLayer } from '@/components/components.types'

defineOptions({
    name: 'LayoutHeader',
})

const userStore = useUserStore()
const globalStore = useGlobalStore()

const { isCollapse } = $(storeToRefs(globalStore))
// const router = useRouter()
// const route = useRoute()
const layer = reactive<GlobalDialogLayer>({
    show: false,
    title: '',
    showButton: true,
})
// isCollapse change to hide/show the sidebar
function opendStateChange() {
    globalStore.isCollapseChange(!isCollapse)
}

// login out the system
function handleLogout() {
    userStore.logout()
}

function handleModifyPass() {
    layer.show = true
}
</script>
