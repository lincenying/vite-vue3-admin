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
import basicTemplate from '~/views/dashboard/components/basic-template.vue'
import cardIndex from '~/views/dashboard/components/card-index.vue'
import communication from '~/views/dashboard/components/communication.vue'

defineOptions({
    name: 'DashboardIndex',
})
</script>
