<template>
    <div class="dashboard-index scroll-box">
        <el-scrollbar height="100%">
            <basic-template />
            <card-index />
            <communication />
            <communication />
            <communication />
            <communication />
            <communication />
            <communication />
            <communication />
            <communication />
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import basicTemplate from './components/basic-template.vue'
import communication from './components/communication.vue'

import cardIndex from './components/card-index.vue'

defineOptions({
    name: 'DashboardIndex',
})
</script>
