<template>
    <div class="layout-container">
        <div class="layout-container-form space-between flex">
            <div class="layout-container-form-handle">
                <el-button type="primary" :icon="Plus" @click="handleAdd">{{ '新增' }}</el-button>
                <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel(chooseData)">
                    <template #reference>
                        <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ '批量删除' }}</el-button>
                    </template>
                </el-popconfirm>
            </div>
            <div class="layout-container-form-search">
                <el-input v-model="query.input" placeholder="请输入关键词进行检索" @change="getTableData(true)" />
                <el-button type="primary" :icon="Search" class="search-btn" @click="getTableData(true)">{{ '搜索' }}</el-button>
            </div>
        </div>
        <div class="layout-container-table">
            <layoutTable
                v-model:page="page"
                v-loading="loading"
                :show-index="true"
                :show-selection="true"
                :data="tableData"
                @get-table-data="getTableData"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="name" label="名称" align="center" />
                <el-table-column prop="number" label="数字" align="center" />
                <el-table-column prop="chooseName" label="选择器" align="center" />
                <el-table-column prop="radioName" label="单选框" align="center" />
                <el-table-column label="操作" align="center" fixed="right" width="200">
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.row)">{{ '编辑' }}</el-button>
                        <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel([scope.row])">
                            <template #reference>
                                <el-button type="danger">{{ '删除' }}</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </layoutTable>
            <dialogModify v-if="layer.show" :layer="layer" @update="(payload: boolean) => layer.show = payload" @get-table-data="getTableData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Delete, Plus, Search } from '@element-plus/icons'
import dialogModify from './crud-table/dialog-modify.vue'
import { radioData, selectData } from './crud-table/enum'
import { ElMessage } from '@/config/element'
import layoutTable from '@/components/layout-table.vue'
import type { LayoutDialogLayer, LayoutTablePage } from '@/components/components.types'

defineOptions({
    name: 'CrudTable',
    inheritAttrs: true,
})

// 存储搜索用的数据
const query = reactive({
    input: '',
})
// 弹窗控制器
const layer: LayoutDialogLayer = reactive({
    show: false,
    title: '新增',
    showButton: true,
})
// 分页参数, 供table使用
const page: LayoutTablePage = reactive({
    index: 1,
    size: 20,
    total: 0,
})
const loading = ref(true)
const tableData = ref<any[]>([])
const chooseData = ref([])
function handleSelectionChange(val: []) {
    chooseData.value = val
}
// 获取表格数据
// params <init> Boolean ，默认为false，用于判断是否需要初始化分页
async function getTableData(init: boolean) {
    loading.value = true
    if (init)
        page.index = 1

    const params = {
        page: page.index,
        pageSize: page.size,
        ...query,
    }
    const { code, data } = await $api.post<ResponseDataLists<any[]>>('/table/list', params)
    if (code === 200) {
        if (Array.isArray(data.list)) {
            data.list.forEach((d) => {
                const select = selectData.find(select => select.value === d.choose)
                select ? d.chooseName = select.label : d.chooseName = d.choose
                const radio = radioData.find(select => select.value === d.radio)
                if (radio)
                    d.radioName = radio.label
                else
                    d.radioName = d.radio
            })
        }
        tableData.value = data.list
        page.total = Number(data.pager.total)
    }

    loading.value = false
}
// 删除功能
async function handleDel(data: object[]) {
    const params = {
        ids: data.map((e: any) => {
            return e.id
        }).join(','),
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
    delete layer.row
}
// 编辑弹窗功能
function handleEdit(row: Obj) {
    layer.title = '编辑数据'
    layer.row = row
    layer.show = true
}
getTableData(true)
</script>

<style lang="scss" scoped>

</style>
