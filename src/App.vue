<template>
    <el-config-provider :size="elementSize" :locale="zhCn">
        <LayoutIndex />
    </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import LayoutIndex from './layout/index.vue'

defineOptions({
    name: 'App',
    inheritAttrs: true,
})

const globalStore = useGlobalStore()
const { elementSize } = $(storeToRefs(globalStore))
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100vh;
}
</style>
