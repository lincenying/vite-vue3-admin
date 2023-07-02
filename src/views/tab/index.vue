<template>
    <div class="layout-container">
        <div style="text-align: left; padding: 15px;">
            <el-button @click="refresh">重新加载</el-button>
            <el-button @click="closeCurrent">关闭当前标签</el-button>
            <el-button type="primary" @click="closeOther">关闭其他标签</el-button>
            <el-button type="success" @click="closeAll">关闭所有标签</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'TabIndex',
    inheritAttrs: true,
})

/** 关闭当前选项卡 */
function closeCurrent() {
    closeCurrentTab()
}
/** 关闭其他选项卡 */
function closeOther() {
    closeOtherTab()
}
/** 关闭所有选项卡 */
function closeAll() {
    closeAllTab()
}
/** 重新加载 */
function refresh() {
    refreshCurrentTab()
}
</script>

<style lang="scss" scoped>

</style>
