<template>
    <div class="table-category box-border h-full w-full flex p-15px">
        <div class="w-250px">
            <comp-category />
        </div>
        <div class="h-full w-calc(100%-250px) flex-1">
            <comp-category-table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ICategory } from '~/types/table.types'

defineOptions({
    name: 'CategoryTable',
    inheritAttrs: true,
})

const activeCateogy = ref({} as ICategory)
provide(activeCategoryKey, activeCateogy)
provide(updateActiveCategoryKey, (payload: ICategory) => {
    activeCateogy.value = payload
})
</script>
