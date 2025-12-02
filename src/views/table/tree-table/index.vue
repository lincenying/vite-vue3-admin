<template>
    <div class="table-tree" p-15px flex h-full w-full box-border>
        <div w-250px>
            <comp-tree />
        </div>
        <div flex-1 h-full w="[calc(100%-250px)]">
            <comp-tree-table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TreeType } from '~/types/table.types'

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
