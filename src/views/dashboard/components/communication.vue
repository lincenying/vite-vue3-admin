<template>
    <el-card class="mt-20px">
        <template #header>
            <div text-left>
                <span>技术支持</span>
            </div>
        </template>
        <div class="box">
            <div flex="~ items-center">
                <h4 mr-20px>免费服务</h4>
            </div>
            <div flex="~ items-center">
                <h4 mr-20px>付费服务</h4>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'Communication',
    inheritAttrs: true,
})
</script>
