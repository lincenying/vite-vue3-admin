<template>
    <div class="global-box table-category-right">
        <div class="global-box-form flex">
            <div class="global-box-form-handle">
                <el-button type="primary" @click="handleAdd">
                    新增<el-icon slots="icon" class="ml-5px"><i-ep-plus /></el-icon>
                </el-button>
                <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel(chooseData)">
                    <template #reference>
                        <el-button type="danger" :disabled="chooseData.length === 0">
                            批量删除<el-icon slots="icon" class="ml-5px"><i-ep-delete /></el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <div class="global-box-form-search">
                <el-input v-model="query.input" placeholder="请输入关键词进行检索" />
                <el-button type="primary" class="search-btn" @click="handleSubmit">
                    搜索<el-icon slots="icon" class="ml-5px"><i-ep-search /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="global-box-table">
            <global-table
                v-model:page="page"
                v-loading="loading"
                :show-index="true"
                :show-selection="true"
                :data="tableData"
                @get-table-data="getTableData"
                @selection-change="onSelectionChange"
                @update-page="onUpdatePage"
            >
                <el-table-column prop="name" label="名称" align="center" />
                <el-table-column prop="number" label="数字" align="center" />
                <el-table-column prop="chooseName" label="选择器" align="center" />
                <el-table-column prop="radioName" label="单选框" align="center" />
                <el-table-column label="操作" align="center" fixed="right" width="200">
                    <template #default="{ row }: { row: TableListType }">
                        <el-button @click="handleEdit(row)">{{ '编辑' }}</el-button>
                        <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel([row])">
                            <template #reference>
                                <el-button type="danger">{{ '删除' }}</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </global-table>
            <dialog-modify v-if="layer.show" :layer="layer" @update="(payload: boolean) => (layer.show = payload)" @get-table-data="getTableData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { radioData, selectData } from './enum'
import dialogModify from './dialog-modify.vue'
import type { CategoryType, TableListType, UpdatePageType } from '@/types'
import { ElMessage } from '@/config/element'
import type { GlobalDialogLayer, GlobalTablePage } from '@/components/components.types'
import { activeCategoryKey } from '@/composables/provide'

defineOptions({
    name: 'MyTable',
    inheritAttrs: true,
})

// 存储搜索用的数据
const query = reactive({
    input: '',
})
// 弹窗控制器
const layer = reactive<GlobalDialogLayer>({
    show: false,
    title: '新增',
    showButton: true,
})
// 分页参数, 供table使用
const page = reactive<GlobalTablePage>({
    index: 1,
    size: 20,
    total: 0,
})
const activeCategory = inject(activeCategoryKey, ref({} as CategoryType))

const [loading, toggleLoading] = useToggle(false)
const tableData = ref<TableListType[]>([])
const chooseData = ref<TableListType[]>([])

// 更新选中
function onSelectionChange(val: []) {
    chooseData.value = val
}

// 更新分页参数
function onUpdatePage(payload: UpdatePageType | UpdatePageType[]) {
    if (Array.isArray(payload)) {
        payload.forEach((item) => {
            page[item.key] = item.value
        })
    }
    else {
        page[payload.key] = payload.value
    }
    getTableData(false)
}
// 获取表格数据
// params <init> Boolean ，默认为false，用于判断是否需要初始化分页
async function getTableData(init: boolean) {
    const { stop } = useTimeoutFn(() => toggleLoading(true), 200)
    if (init)
        page.index = 1

    const params = {
        category: activeCategory.value.id,
        page: page.index,
        pageSize: page.size,
        ...query,
    }
    const { code, data } = await $api.post<ResponseDataLists<TableListType[]>>('/table/list', params)
    if (code === 200) {
        if (Array.isArray(data.list)) {
            data.list.forEach((d) => {
                const select = selectData.find(select => select.value === d.choose)
                select ? (d.chooseName = select.label) : (d.chooseName = d.choose)
                const radio = radioData.find(select => select.value === d.radio)
                if (radio)
                    d.radioName = radio.label
                else d.radioName = d.radio
            })
        }
        tableData.value = data.list
        page.total = Number(data.pager.total)
    }
    stop()
    toggleLoading(false)
}
// 删除功能
async function handleDel(data: TableListType[]) {
    const params = {
        ids: data.map((e) => { return e.id }).join(','),
    }
    const { code } = await $api.post('/table/del', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        getTableData(tableData.value.length === 1)
    }
}
// 新增弹窗功能
function handleAdd() {
    layer.title = '新增数据'
    layer.row = undefined
    layer.show = true
}
// 编辑弹窗功能
function handleEdit(row: object) {
    layer.title = '编辑数据'
    layer.row = row
    layer.show = true
}
// 搜索
function handleSubmit() {
    getTableData(true)
}

watch(activeCategory, () => {
    getTableData(true)
})
</script>