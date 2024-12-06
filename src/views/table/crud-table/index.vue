<template>
    <div class="global-box table-crud">
        <div class="global-box-form flex">
            <div class="global-box-form-handle">
                <el-button type="primary" @click="handleAdd">
                    新增 <el-icon slots="icon" class="ml-5px"><i-ep-plus /></el-icon>
                </el-button>
                <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel(chooseData)">
                    <template #reference>
                        <el-button type="danger" :disabled="chooseData.length === 0">
                            批量删除 <el-icon slots="icon" class="ml-5px"><i-ep-delete /></el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
                <el-button type="primary" @click="handleExportExcel">
                    导出 <el-icon slots="icon" class="ml-5px"><i-mdi-calendar-export-outline /></el-icon>
                </el-button>
            </div>
            <div class="global-box-form-search">
                <el-input v-model="query.input" placeholder="请输入关键词进行检索" />
                <el-button type="primary" class="search-btn" @click="handleSubmit">
                    搜索 <el-icon slots="icon" class="ml-5px"><i-ep-search /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="global-box-table">
            <global-table
                ref="globalTableRef"
                v-loading="loading"
                prop-key="table"
                :page="page"
                :show-index="true"
                :show-selection="true"
                :show-page="true"
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
                    <template #default="{ row }: ScopeRow">
                        <el-button @click="handleEdit(row)">{{ '编辑' }}</el-button>
                        <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel([row])">
                            <template #reference>
                                <el-button type="danger">{{ '删除' }}</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </global-table>
            <dialog-crud-modify v-if="layer.show" :layer="layer" @update="(payload: boolean) => layer.show = payload" @get-table-data="getTableData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer, GlobalTablePage } from '~/components/components.types'
import type { TableListType, UpdatePageType } from '~/types'

import globalTable from '~/components/global-table.vue'
import { ElMessage } from '~/config/element'

import { radioData, selectData } from '~/views/table/enum'

interface ScopeRow {
    row: TableListType
    $index: number
}

defineOptions({
    name: 'CrudTable',
    inheritAttrs: true,
})

// 存储搜索用的数据
const query = reactive({
    input: '',
})
// 弹窗控制器
const layer: GlobalDialogLayer<TableListType> = reactive({
    show: false,
    title: '新增',
    showButton: true,
    row: undefined,
    width: '500px',
})
// 分页参数, 供table使用
const page: GlobalTablePage = reactive({
    index: 1,
    size: 20,
    total: 0,
})

const globalTableRef = ref<any>()

const [loading, toggleLoading] = useToggle(false)
const tableData = ref<TableListType[]>([])
const chooseData = ref<TableListType[]>([])

// 更新选中
function onSelectionChange(val: any[]) {
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
    if (init) {
        page.index = 1
    }

    const params = {
        page: page.index,
        pageSize: page.size,
        ...query,
    }
    const { code, data } = await $api.post<ResDataLists<TableListType[]>>('/table/list', params)
    if (code === 200) {
        if (Array.isArray(data.list)) {
            tableData.value = data.list.map((item) => {
                const select = selectData.find(select => select.value === item.choose)
                const radio = radioData.find(select => select.value === item.radio)
                return {
                    ...item,
                    chooseName: select ? select.label : item.choose,
                    radioName: radio ? radio.label : item.radio,
                }
            })
        }
        page.total = Number(data.pager.total)
    }
    stop()
    toggleLoading(false)
}
// 删除功能
async function handleDel(data: TableListType[]) {
    const params = {
        ids: data.map(e => e.id).join(','),
    }
    const { code } = await $api.post<void>('/table/del', params)
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
    layer.show = true
    layer.row = undefined
}
// 编辑弹窗功能
function handleEdit(row: TableListType) {
    layer.title = '编辑数据'
    layer.row = row
    layer.show = true
}

// 导出Excel表格
function handleExportExcel() {
    const exportData = unref(tableData)
    const header = ['ID', '姓名', '数字']
    const data = exportData.map(item => [item.id, item.name, item.number])
    aoaToSheetXlsx({
        data,
        header,
        filename: 'export-excel.xlsx',
    })
}

// 搜索
function handleSubmit() {
    getTableData(true)
}

getTableData(true)
</script>
