<template>
    <div class="layout-container">
        <div v-loading="loading" class="layout-container-table">
            <div ref="box" class="box">
                <el-scrollbar height="100%">
                    <el-row :gutter="20">
                        <el-col v-for="row in list" :key="row.id" :lg="4" :md="8" :sm="12" :xs="24">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <img :src="row.image" class="image">
                                <div style="padding: 14px">
                                    <span>{{ row.title }}</span>
                                    <div class="bottom clearfix">
                                        <time class="time">{{ row.time }}</time>
                                        <el-text type="primary" class="edit-button" @click="showEditor">编辑</el-text>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-empty v-show="list.length === 0" description="空空如也~" style="height: 500px" />
                </el-scrollbar>
            </div>

            <el-pagination
                v-model:current-page="page.index"
                class="system-page"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
                :page-size="page.size"
                :page-sizes="[10, 20, 50, 100]"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { onMounted, reactive, ref } from 'vue'
import { getData } from '@/api/card'
import type { LayoutTablePage } from '@/components/components.types'

defineOptions({
    name: 'Card',
    inheritAttrs: true,
})

const loading = ref(true)
const list = ref<{ id: string; image: string; title: string; time: string }[]>([])
const box: Ref<HTMLDivElement> = ref() as any
const page: LayoutTablePage = reactive({
    index: 1,
    size: 20,
    total: 0,
})
function getListData() {
    loading.value = true
    const params = {
        page: page.index,
        pageSize: page.size,
    }
    getData(params)
        .then((res) => {
            page.total = res.data.pager.total
            list.value = res.data.list
        })
        .catch(() => {
            list.value = []
            page.index = 1
            page.total = 0
        })
        .finally(() => {
            loading.value = false
        })
}
// 分页相关：监听页码切换事件
function handleCurrentChange(val: number) {
    page.index = val
    getListData()
}
// 分页相关：监听单页显示数量切换事件
function handleSizeChange(val: number) {
    page.size = val
    page.index = 1
    getListData()
}
onMounted(() => {
    box.value.addEventListener('resize', () => {
        console.log(12)
    })
})
function showEditor() {}
getListData()
</script>

<style lang="scss" scoped>
* {
    text-align: left;
}
.el-col {
    margin-bottom: 20px;
}
.box {
    height: calc(100% - 50px);

    margin-bottom: 15px;
    :deep(.is-horizontal) {
        display: none;
    }
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.edit-button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}

.clearfix:after {
    clear: both;
}
</style>
