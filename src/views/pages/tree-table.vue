<template>
    <div class="full">
        <div class="left">
            <Tree />
        </div>
        <div class="content">
            <myTable />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Tree from './tree-table/tree.vue'
import myTable from './tree-table/my-table.vue'

defineOptions({
    name: 'TreeTable',
    inheritAttrs: true,
})

const active: any = ref({})
provide('active', active)
</script>

<style lang="scss" scoped>
.full {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    .left {
        width: 250px;
    }
    .content {
        flex: 1;
        width: calc(100% - 250px);
        height: 100%;
    }
}
</style>
