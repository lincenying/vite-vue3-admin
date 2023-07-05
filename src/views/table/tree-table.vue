<template>
    <div class="table-tree" w="[100%]" h="[100%]" box-border flex p-15px>
        <div class="w-250px">
            <tree />
        </div>
        <div class="h-[100%] w-[calc(100%-250px)] flex-1">
            <comp-tree-table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import tree from './tree-table/tree.vue'
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
