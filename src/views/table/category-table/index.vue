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
import type { CategoryType } from '~/types'

defineOptions({
    name: 'CategoryTable',
    inheritAttrs: true,
})

const activeCateogy = ref({} as CategoryType)
provide(activeCategoryKey, activeCateogy)
provide(updateActiveCategoryKey, (payload: CategoryType) => {
    activeCateogy.value = payload
})
</script>
