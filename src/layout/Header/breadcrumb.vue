<template>
    <el-breadcrumb class="layout-header-breadcrumb" separator="/">
        <transition-group appear name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">
                    {{ item.meta.title }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import type { Route } from '@/router/index.type'

defineOptions({
    name: 'BreadCrumb',
})

const levelList = ref<RouteLocationMatched[]>([])
const route = useRoute()
const router = useRouter()

const allRoutes = router.options.routes as Route[]

function getParentsRoute(arr: RouteLocationMatched[] = [], key: string): RouteLocationMatched[] {
    const obj = allRoutes.find(item => item.path === key)
    arr.unshift(obj as RouteLocationMatched)
    if (obj && obj.parentPath)
        return getParentsRoute(arr, obj.parentPath)
    return arr
}

function getBreadcrumb(): void {
    const matched = route.matched.filter(item => item.meta && item.meta.title)
    if (matched && matched[0]) {
        const fullMatched = getParentsRoute([], matched[0].path)
        levelList.value = fullMatched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
}
getBreadcrumb()

watch(
    () => route.path,
    () => getBreadcrumb(),
)
function handleLink(item: RouteLocationMatched) {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect.toString())
        return
    }
    router.push(path)
}
</script>
