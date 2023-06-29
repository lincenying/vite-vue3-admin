<template>
    <header>
        <div class="left-box">
            <!-- 收缩按钮 -->
            <div class="menu-icon" @click="opendStateChange">
                <i class="sfont head-fold" :class="isCollapse ? 'system-s-unfold' : 'system-s-fold'" />
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
                        <i class="sfont system-xiala" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="showPasswordLayer">修改密码</el-dropdown-item>
                            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <dialog-password v-if="layer.show" :layer="layer" @update="(payload: boolean) => layer.show = payload" />
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'

import Breadcrumb from './header/breadcrumb.vue'
import dialogPassword from './header/dialog-password.vue'
import FullScreen from './header/fullscreen.vue'
import LayoutTheme from './header/layout-theme.vue'
import Github from './header/github.vue'
import type { LayoutDialogLayer } from '@/components/components.types'

defineOptions({
    name: 'LayoutHeader',
})

const store = useStore()
// const router = useRouter()
// const route = useRoute()
const layer = reactive<LayoutDialogLayer>({
    show: false,
    title: '',
    showButton: true,
})
const isCollapse = computed(() => store.state.app.isCollapse)
// isCollapse change to hide/show the sidebar
function opendStateChange() {
    store.commit('app/isCollapseChange', !isCollapse.value)
}

// login out the system
function loginOut() {
    store.dispatch('user/loginOut')
}

function showPasswordLayer() {
    layer.show = true
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: var(--system-header-background);
    padding-right: 22px;
}
.left-box {
    height: 100%;
    display: flex;
    align-items: center;
    .menu-icon {
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        font-weight: 100;
        cursor: pointer;
        margin-right: 10px;
        &:hover {
            background-color: var(--system-header-item-hover-color);
        }
        i {
            color: var(--system-header-text-color);
        }
    }
}
.right-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .function-list {
        display: flex;
        .function-list-item {
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            :deep(i) {
                color: var(--system-header-text-color);
            }
        }
    }
    .user-info {
        margin-left: 20px;
        .el-dropdown-link {
            color: var(--system-header-breadcrumb-text-color);
        }
    }
}
.head-fold {
    font-size: 20px;
}
</style>
