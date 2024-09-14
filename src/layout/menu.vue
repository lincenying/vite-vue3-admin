<template>
    <el-scrollbar class="layout-menu">
        <el-menu
            class="system-scrollbar layout-menu-wrap"
            background-color="var(--system-menu-background)"
            text-color="var(--system-menu-text-color)"
            active-text-color="var(--system-primary-color)"
            :default-active="activeMenu"
            :class="isCollapse ? 'collapse' : ''"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="expandOneMenu"
        >
            <menu-item v-for="(menu, key) in modules" :key="key" :menu="menu" />
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import menuItem from '~/layout/menu/menu-item.vue'
import { modules } from '~/router/index'

defineOptions({
    name: 'LayoutMenu',
})

const globalStore = useGlobalStore()

const { isCollapse, expandOneMenu } = $(storeToRefs(globalStore))

const route = useRoute()
const activeMenu = computed(() => {
    const { meta, path } = route
    return meta.activeMenu || path
})
onMounted(() => {})
</script>
