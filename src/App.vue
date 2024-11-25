<template>
    <el-config-provider :size="elementSize" :locale="zhCn">
        <LayoutIndex />
    </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import LayoutIndex from './layout/index.vue'

defineOptions({
    name: 'App',
    inheritAttrs: true,
})

const globalStore = useGlobalStore()
const { elementSize } = $(storeToRefs(globalStore))
</script>

<style lang="scss" scoped>

</style>
