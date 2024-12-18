<template>
    <div class="global-box table-card">
        <div v-loading="loading" class="global-box-table" pr-5px>
            <div ref="box" class="box" mb-15px h="[calc(100%-50px)]">
                <ElScrollbar ref="scrollBarRef" height="100%">
                    <el-row :gutter="20">
                        <el-col v-for="row in list" :key="row.id" :lg="4" :md="8" :sm="12" :xs="24">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <img :src="row.image" block w-full>
                                <div p-14px text-left>
                                    <span>{{ row.title }}</span>
                                    <div mt-13px flex-bc lh-12px>
                                        <time text="13px hex-999">{{ row.time }}</time>
                                        <el-text type="primary" p-0 @click="showEditor">编辑</el-text>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-empty v-show="list.length === 0" description="空空如也~" class="h-500px" />
                </ElScrollbar>
            </div>

            <el-pagination
                v-model:current-page="page.index"
                class="system-page"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
                :page-size="page.size"
                :page-sizes="[10, 20, 50, 100]"
                @current-change="onCurrentChange"
                @size-change="onSizeChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { GlobalTablePage } from '~/components/components.types'
import type { CardListType } from '~/types'

import { ElScrollbar } from 'element-plus'

defineOptions({
    name: 'Card',
    inheritAttrs: true,
})

const [loading, toggleLoading] = useToggle(false)

const list = ref<CardListType[]>([])
const box = ref<HTMLDivElement>()

const scrollBarRef = ref<InstanceType<typeof ElScrollbar>>()

const page: GlobalTablePage = reactive({
    index: 1,
    size: 20,
    total: 0,
})

async function getListData() {
    const { stop } = useTimeoutFn(() => toggleLoading(true), 200)
    const params = {
        page: page.index,
        pageSize: page.size,
    }
    const { code, data } = await $api.post<ResDataLists<CardListType[]>>('/card/list', params)
    stop()
    toggleLoading(false)
    if (code === 200) {
        page.total = data.pager.total
        list.value = data.list
    }
}

// 分页相关：监听页码切换事件
function onCurrentChange(val: number) {
    page.index = val
    getListData()
}
// 分页相关：监听单页显示数量切换事件
function onSizeChange(val: number) {
    page.size = val
    page.index = 1
    getListData()
}

onMounted(() => {
    box.value?.addEventListener('resize', () => {
    })
})
function showEditor() {}
getListData()
</script>
