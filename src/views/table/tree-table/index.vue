<template>
    <div class="table-tree" box-border h-full w-full flex p-15px>
        <div w-250px>
            <comp-tree />
        </div>
        <div h-full flex-1 w="[calc(100%-250px)]">
            <comp-tree-table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ITree } from '~/types/table.types'

defineOptions({
    name: 'TreeTable',
    inheritAttrs: true,
})

const activeTree = ref({} as ITree)
provide(activeTreeKey, activeTree)
provide(updateActiveTreeKey, (payload: ITree) => {
    activeTree.value = payload
})
</script>
