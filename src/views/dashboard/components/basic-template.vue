<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>基础模板</span>
                <el-link type="primary" href="https://github.com/lincenying/vue3-admin" target="_blank" style="margin-left: 20px">github地址</el-link>
            </div>
        </template>
        <div class="box">
            <div class="item">
                <h4>ts</h4>
                <p>ts版本的基础模板</p>
                <el-link type="primary" href="https://github.com/lincenying/vue3-admin" target="_blank">demo</el-link>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'BasicTemplate',
})
</script>

<style lang="scss" scoped>
.box-card {
    .card-header {
        text-align: left;
    }
    .box {
        .item {
            display: flex;
            align-items: center;
            * {
                margin-right: 20px;
            }
        }
    }
}
</style>
