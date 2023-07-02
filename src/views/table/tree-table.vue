<template>
    <div class="full">
        <div class="left">
            <Tree />
        </div>
        <div class="content">
            <comp-tree-table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Tree from './tree-table/tree.vue'
import compTreeTable from './tree-table/comp-tree-table.vue'
import type { TreeType } from '@/types'

defineOptions({
    name: 'TreeTable',
    inheritAttrs: true,
})

const activeTree = ref({} as TreeType)
provide(activeTreeKey, activeTree)
provide(updateActiveTreeKey, (payload: TreeType) => {
    activeTree.value = payload
})
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
