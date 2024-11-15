<template>
    <template v-if="!menu.hideMenu">
        <el-sub-menu v-if="showMenuType === 2" :index="menu.path" :show-timeout="200" :hide-timeout="200" :popper-offset="2">
            <template #title>
                <i v-if="menu.meta.icon" :class="menu.meta.icon" />
                <span>{{ menu.meta.title }}</span>
            </template>
            <menu-item v-for="(item, key) in menu.children" :key="key" :menu="item" :base-path="menu.path" />
        </el-sub-menu>
        <appLink v-else-if="showMenuType === 1" :to="menu.path">
            <el-menu-item v-if="!menu.children[0].children || menu.children[0].children.length === 0" :index="menu.path">
                <i v-if="menu.children[0].meta.icon || menu.meta.icon" :class="menu.children[0].meta.icon || menu.meta.icon" />
                <template #title>{{ menu.children[0].meta.title }}</template>
            </el-menu-item>
            <el-sub-menu v-else :index="menu.path" :show-timeout="200" :hide-timeout="200" :popper-offset="2">
                <template #title>
                    <i v-if="menu.children[0].meta.icon || menu.meta.icon" :class="menu.children[0].meta.icon || menu.meta.icon" />
                    <span>{{ menu.children[0].meta.title }}</span>
                </template>
                <menu-item v-for="(item, key) in menu.children[0].children" :key="key" :menu="item" :base-path="menu.path" />
            </el-sub-menu>
        </appLink>
        <appLink v-else :to="menu.path">
            <el-menu-item :index="menu.path">
                <i v-if="menu.meta.icon" :class="menu.meta.icon" />
                <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
        </appLink>
    </template>
</template>

<script lang="ts" setup>
import type { Route } from '~/router/index.type'

import appLink from '~/layout/menu/link.vue'

defineOptions({
    name: 'MenuItem',
})

const { menu } = defineProps<{
    menu: Route
    basePath?: string
}>()

// todo: 优化if结构
const showMenuType = computed(() => {
    // 0: 无子菜单， 1：有1个子菜单， 2：显示上下级子菜单
    if (menu.children && (menu.children.length > 1 || (menu.children.length === 1 && menu.alwayShow))) {
        return 2
    }
    else if (menu.children && menu.children.length === 1 && !menu.alwayShow) {
        return 1
    }
    return 0
})
</script>
