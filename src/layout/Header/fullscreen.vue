<template>
    <div :title="isFullscreen ? '退出全屏' : '全屏'">
        <i class="iconfont" :class="isFullscreen ? 'icon-unFullScreen' : 'icon-fullScreen'" @click="toggle" />
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>
i {
    cursor: pointer;
    font-size: 18px;
    &:focus {
        outline: none;
    }
}
</style>
