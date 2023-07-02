<template>
    <div class="category">
        <div class="header-box">
            <h2>分类列表</h2>
            <el-input v-model="input" placeholder="请输入内容" @input="searchData(true)" />
        </div>
        <ul ref="listDom" v-infinite-scroll="getCategoryData" class="list system-scrollbar" :infinite-scroll-immediate="false" style="overflow: auto">
            <li v-for="item in list" :key="item.id" :class="{ active: item.id === activeCategory?.id }" @click="changeActive(item)">
                <span>{{ item.name }}</span>
            </li>
            <p v-if="loading" class="load-tip">加载中...</p>
            <p v-if="nomore" class="load-tip">数据加载完成</p>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { debounce } from 'throttle-debounce'
import type { CategoryType } from '@/types'
import { activeCategoryKey, updateActiveCategoryKey } from '@/composables/provide'

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
        listDom.value && (listDom.value.scrollTop = 0)
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
    const { code, data } = await $api.post<ResponseDataLists<CategoryType[]>>('/table/category', params)
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

<style lang="scss" scoped>
.category {
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header-box {
        padding: 10px;
        display: flex;
        align-items: center;
        h2 {
            padding: 0;
            margin: 0;
            margin-right: 20px;
            font-size: 14px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            height: 30px;
            line-height: 30px;
        }
        .el-input {
            flex: 1;
        }
    }
    .list {
        flex: 1;
        height: auto;
        margin: 0;
        padding: 0;
        display: block;
        li {
            height: 38px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            width: 100%;
            box-sizing: border-box;
            cursor: pointer;
            transition: 0.2s;
            & + li {
                border-top: 1px solid #eee;
            }
            &:hover {
                background: #eee;
            }
            &.active {
                background: rgba(186, 220, 255, 0.4);
            }
            span {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size: 14px;
            }
        }
        .load-tip {
            font-size: 14px;
            color: #616161;
        }
    }
}
</style>
