<template>
    <el-card>
        <template #header>
            <div class="text-left">
                <span>基础模板</span>
                <el-link type="primary" href="https://github.com/lincenying/vue3-admin" target="_blank" class="ml-20px">github地址</el-link>
            </div>
        </template>
        <div class="box">
            <div class="flex items-center">
                <h4 class="mr-20px">ts</h4>
                <p class="mr-20px">ts版本的基础模板</p>
                <el-link class="mr-20px" type="primary" href="https://github.com/lincenying/vue3-admin" target="_blank">demo</el-link>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'BasicTemplate',
})
</script>
