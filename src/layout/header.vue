<template>
    <header class="layout-header">
        <div class="left-box">
            <!-- 收缩按钮 -->
            <div class="menu-icon" @click="opendStateChange">
                <i class="iconfont head-fold" :class="isCollapse ? 'icon-s-unfold' : 'icon-s-fold'" />
            </div>
            <breadcrumb />
        </div>
        <div class="right-box">
            <!-- 快捷功能按钮 -->
            <div class="function-list">
                <div class="function-list-item hidden-sm-and-down"><full-screen /></div>
                <div class="function-list-item hidden-sm-and-down"><layout-theme /></div>
                <div class="function-list-item hidden-sm-and-down"><github /></div>
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
            <dialogPassword v-if="layer.show" :layer="layer" @update="(payload: boolean) => layer.show = payload" />
        </div>
    </header>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer } from '~/components/components.types'

import breadcrumb from '~/layout/header/breadcrumb.vue'
import dialogPassword from '~/layout/header/dialog-password.vue'
import fullScreen from '~/layout/header/full-screen.vue'
import github from '~/layout/header/github.vue'
import layoutTheme from '~/layout/header/layout-theme.vue'

defineOptions({
    name: 'LayoutHeader',
})

const userStore = useUserStore()
const globalStore = useGlobalStore()

const { isCollapse } = $(storeToRefs(globalStore))
// const router = useRouter()
// const route = useRoute()
const layer: GlobalDialogLayer<Objable> = reactive({
    show: false,
    title: '',
    showButton: true,
    width: '500px',
})
// isCollapse change to hide/show the sidebar
function opendStateChange() {
    globalStore.$patch({
        isCollapse: !isCollapse,
    })
}

// login out the system
function handleLogout() {
    userStore.logout()
}

function handleModifyPass() {
    layer.show = true
}
</script>
