<template>
    <el-scrollbar class="layout-menu">
        <el-menu
            class="layout-menu-wrap system-scrollbar"
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
    return allRoutes.filter(item => item.parentPath === parentPath && !item.hideMenu).map((item) => {
        return {
            ...item,
            children: getChildren(item.path),
        }
    })
}

const routes = allRoutes.filter(item => item.level === 1 && !item.hideMenu).map((item) => {
    return {
        ...item,
        children: getChildren(item.path),
    }
})

const route = useRoute()
const activeMenu = computed(() => {
    const { meta, path } = route
    return meta.activeMenu || path
})
onMounted(() => {})
</script>
