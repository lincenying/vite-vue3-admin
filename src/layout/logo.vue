<template>
    <div class="logo-container">
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

<style lang="scss" scoped>
.logo-container {
    height: 60px;
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    background-color: var(--system-logo-background);
    h1 {
        margin-left: 6px;
        font-size: 18px;
        white-space: nowrap;
        color: var(--system-logo-color);
    }
}
</style>
