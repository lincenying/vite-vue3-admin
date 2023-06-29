<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>技术支持</span>
            </div>
        </template>
        <div class="box">
            <div class="item">
                <h4>免费服务</h4>
            </div>
            <div class="item">
                <h4>付费服务</h4>
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

<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
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
        .my-item {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            p {
                margin-top: 10px;
            }
        }
    }
}
</style>
