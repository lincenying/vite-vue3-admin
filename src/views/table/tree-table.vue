<template>
    <div class="table-tree" box-border h-full w-full flex p-15px>
        <div w-250px>
            <tree />
        </div>
        <div h-full flex-1 w="[calc(100%-250px)]">
            <comp-tree-table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TreeType } from '~/types'

import compTreeTable from './tree-table/comp-tree-table.vue'
import tree from './tree-table/tree.vue'

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
