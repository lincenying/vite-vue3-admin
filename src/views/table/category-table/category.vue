<template>
    <div class="table-category-left">
        <div class="header-box">
            <h2>分类列表</h2>
            <el-input v-model="input" placeholder="请输入内容" @input="searchData(true)" />
        </div>
        <ul ref="listDom" v-infinite-scroll="getCategoryData" class="system-scrollbar list overflow-auto" :infinite-scroll-immediate="false">
            <li v-for="item in list" :key="item.id" :class="{ active: item.id === activeCategory?.id }" @click="changeActive(item)">
                <span>{{ item.name }}</span>
            </li>
            <p v-if="loading" class="load-tip">加载中...</p>
            <p v-if="nomore" class="load-tip">数据加载完成</p>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type { CategoryType } from '~/types'

import { debounce } from 'throttle-debounce'
import { activeCategoryKey, updateActiveCategoryKey } from '~/composables/provide'

defineOptions({
    name: 'Category',
    inheritAttrs: true,
})

const listDom = ref<HTMLElement>()
const page = {
    index: 1,
    size: 30,
    total: 0,
}
const [loading, toggleLoading] = useToggle(false)
const [isFirst, toggleisFirst] = useToggle(false)

const input = ref('')
const list = ref<CategoryType[]>([])
const nomore = ref(false)

const activeCategory = inject(activeCategoryKey)
const updateActiveCategory = inject(updateActiveCategoryKey, () => {})

async function getCategoryData(init?: boolean) {
    const { stop } = useTimeoutFn(() => toggleLoading(true), 200)
    if (init || isFirst.value) {
        toggleisFirst(false)
        page.index = 1
        if (listDom.value)
            (listDom.value.scrollTop = 0)
    }
    else {
        if (page.index * page.size >= page.total) {
            toggleLoading(false)
            nomore.value = true
            return
        }
    }
    const params = {
        page: page.index,
        pageSize: page.size,
        keyword: input.value,
    }
    const { code, data } = await $api.post<ResDataLists<CategoryType[]>>('/table/category', params)
    if (code === 200) {
        if (page.index === 1) {
            list.value = data.list
            updateActiveCategory(list.value[0])
        }
        else {
            list.value = list.value.concat(data.list)
        }
        page.index += 1
        page.total = data.pager.total
    }
    stop()
    toggleLoading(false)
}
const searchData = debounce(300, getCategoryData)
function changeActive(row: CategoryType) {
    updateActiveCategory(row)
}
getCategoryData(true)
</script>
