<template>
    <div class="dashboard-index">
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
