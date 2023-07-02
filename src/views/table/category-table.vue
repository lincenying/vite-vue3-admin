<template>
    <div class="full">
        <div class="left">
            <Category />
        </div>
        <div class="content">
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

<style lang="scss" scoped>
.full {
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
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
