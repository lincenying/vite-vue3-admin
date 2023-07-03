<template>
    <div class="table-category box-border h-[100%] w-[100%] flex p-15px">
        <div class="w-250px">
            <Category />
        </div>
        <div class="h-[100%] w-[calc(100%-250px)] flex-1">
            <comp-category-table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Category from './category-table/category.vue'
import compCategoryTable from './category-table/comp-category-table.vue'

import type { CategoryType } from '@/types'

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
