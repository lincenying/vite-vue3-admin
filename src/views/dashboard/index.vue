<template>
    <div class="box">
        <el-scrollbar height="100%">
            <BasicTemplate />
            <CardIndex />
            <Communication />
            <Communication />
            <Communication />
            <Communication />
            <Communication />
            <Communication />
            <Communication />
            <Communication />
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import BasicTemplate from './components/basic-template.vue'
import Communication from './components/communication.vue'

import CardIndex from './components/card-index.vue'

defineOptions({
    name: 'DashboardIndex',
})
</script>

<style lang="scss" scoped>
.box {
    padding: 15px 5px 15px 15px;
    height: 100%;
    overflow: hidden;
    :deep(.el-scrollbar__view) {
        margin-right: 10px;
    }
}
</style>
