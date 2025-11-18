<template>
    <div class="layout-logo">
        <img h-24px w-24px src="@/assets/logo.png" alt="">
        <h1 v-if="!isCollapse">后台管理系统</h1>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'LayoutLogo',
})

const globalStore = useGlobalStore()
const { isCollapse } = $(storeToRefs(globalStore))
</script>
