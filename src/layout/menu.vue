<template>
    <el-scrollbar>
        <el-menu
            class="layout-menu system-scrollbar"
            background-color="var(--system-menu-background)"
            text-color="var(--system-menu-text-color)"
            active-text-color="var(--system-primary-color)"
            :default-active="activeMenu"
            :class="isCollapse ? 'collapse' : ''"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="expandOneMenu"
        >
            <MenuItem v-for="(menu, key) in routes" :key="key" :menu="menu" />
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import MenuItem from './menu/menu-item.vue'
import type { Route } from '@/router/index.type'

defineOptions({
    name: 'LayoutMenu',
})

const globalStore = useGlobalStore()

const { isCollapse, expandOneMenu } = $(storeToRefs(globalStore))

const allRoutes = useRouter().options.routes as Route[]

function getChildren(parentPath: string): Route[] {
    return allRoutes
        .filter(item => item.parentPath === parentPath && !item.hideMenu)
        .map((item) => {
            return {
                ...item,
                children: getChildren(item.path),
            }
        })
}

const routes = allRoutes
    .filter(item => item.level === 1 && !item.hideMenu)
    .map((item) => {
        return {
            ...item,
            children: getChildren(item.path),
        }
    })

const route = useRoute()
const activeMenu: any = computed(() => {
    const { meta, path } = route
    if (meta.activeMenu)
        return meta.activeMenu

    return path
})
onMounted(() => {})
</script>

<style lang="scss" scoped>
.el-scrollbar {
    background-color: var(--system-menu-background);
}
.layout-menu {
    width: 100%;
    border: none;
    &.collapse {
        margin-left: 0px;
    }
    :deep() {
        .el-menu-item,
        .el-sub-menu {
            background-color: var(--system-menu-background) !important;
        }
        .el-menu-item i,
        .el-menu-item-group__title,
        .el-sub-menu__title i {
            color: var(--system-menu-text-color);
        }
        .el-menu-item,
        .el-sub-menu__title {
            &.is-active {
                background-color: var(--system-primary-color) !important;
                color: var(--system-primary-text-color) !important;
                i {
                    color: var(--system-primary-text-color) !important;
                }
                &:hover {
                    background-color: var(--system-primary-color) !important;
                    color: var(--system-primary-text-color) !important;
                }
            }
            &:hover {
                background-color: var(--system-menu-hover-background) !important;
            }
        }
        .el-sub-menu {
            &.is-active {
                > .el-sub-menu__title,
                > .el-sub-menu__title i {
                    color: var(--system-menu-submenu-active-color) !important;
                }
            }
            .el-menu-item {
                background-color: var(--system-menu-children-background) !important;
                &.is-active {
                    background-color: var(--system-primary-color) !important;
                    color: var(--system-primary-text-color) !important;
                    &:hover {
                        background-color: var(--system-primary-color) !important;
                        color: var(--system-primary-text-color) !important;
                    }
                }
                &:hover {
                    background-color: var(--system-menu-hover-background) !important;
                }
            }
            .el-sub-menu {
                .el-sub-menu__title {
                    background-color: var(--system-menu-children-background) !important;
                    &:hover {
                        background-color: var(--system-menu-hover-background) !important;
                    }
                }
            }
        }
    }
}
</style>
