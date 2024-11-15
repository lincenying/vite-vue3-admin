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
defineOptions({
    name: 'DashboardIndex',
})
</script>
