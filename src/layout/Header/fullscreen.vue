<template>
    <div :title="isFullscreen ? '退出全屏' : '全屏'">
        <i class="iconfont cursor-pointer text-18px focus-outline-none" :class="isFullscreen ? 'icon-unFullScreen' : 'icon-fullScreen'" @click="toggle" />
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>
