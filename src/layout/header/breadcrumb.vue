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
import type { Route } from '~/router/index.type'

import { useRoute, useRouter } from 'vue-router'
import { modules } from '~/router/index'

defineOptions({
    name: 'BreadCrumb',
})

const levelList = ref<Route[]>([])
const route = useRoute()
const router = useRouter()

function findParentNames(arr: Route[], targetName: string, parentNames: Route[] = []): null | Route[] {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        // 如果找到目标name，则返回当前的父级names数组
        if (item.meta.title === targetName) {
            return parentNames.concat({
                ...item,
                children: [],
            })
        }

        // 如果存在子数组，则递归调用findParentNames函数继续查找
        if (item.children && item.children.length > 0) {
            const newParentNames = parentNames.concat({
                ...item,
                children: [],
            })
            const foundNames = findParentNames(item.children, targetName, newParentNames)
            // 如果在子数组中找到了目标name，直接返回父级names数组
            if (foundNames) {
                return foundNames
            }
        }
    }
    // 如果在当前层级未找到目标name，则返回null
    return null
}

function getBreadcrumb(): void {
    const matched = route.matched.filter(item => item.meta && item.meta.title)
    if (matched && matched[0]) {
        const fullMatched = findParentNames(modules, matched[0].meta.title) || []
        levelList.value = fullMatched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
}
getBreadcrumb()

watch(
    () => route.path,
    () => getBreadcrumb(),
)
function handleLink(item: Route) {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect.toString())
        return
    }
    router.push(path)
}
</script>
