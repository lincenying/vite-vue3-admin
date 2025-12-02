<template>
    <div class="global-box system-manage-user">
        <div class="global-box-form" flex>
            <div class="global-box-form-handle">
                <el-button type="primary" @click="handleAdd"> 新增 <el-icon slots="icon" ml-5px><i-ep-plus /></el-icon> </el-button>
                <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel(chooseData)">
                    <template #reference>
                        <el-button type="danger" :disabled="chooseData.length === 0">
                            批量删除
                            <el-icon slots="icon" ml-5px>
                                <i-ep-delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <div class="global-box-form-search">
                <el-input v-model="query.input" placeholder="请输入关键词进行检索" />
                <el-button type="primary" class="search-btn" @click="handleSubmit">
                    搜索 <el-icon slots="icon" ml-5px><i-ep-search /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="global-box-table">
            <globalTable
                v-loading="loading"
                :page="page"
                :show-selection="true"
                prop-key="role"
                :data="tableData"
                @get-table-data="getTableData"
                @selection-change="onSelectionChange"
                @update-page="onUpdatePage"
            >
                <el-table-column prop="id" label="Id" align="center" width="80" />
                <el-table-column prop="name" label="角色名称" align="center" width="180" />
                <el-table-column prop="desc" label="角色描述" />
                <el-table-column prop="time" label="创建时间" align="center" width="200" />
                <el-table-column label="操作" align="center" fixed="right" width="200">
                    <template #default="{ row }: ScopeRow">
                        <el-button @click="handleEdit(row)">编辑</el-button>
                        <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel([row])">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </globalTable>
            <dialogRoleModify
                v-if="layer.show"
                v-model="layer"
                @update="(payload: boolean) => (layer.show = payload)"
                @get-table-data="getTableData"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer, GlobalTablePage } from '~/types/components.types'
import type { RoleListType } from '~/types/system.types'

import type { UpdatePageType } from '~/types/table.types'
import { ElMessage } from '@/config/element'

interface ScopeRow {
    row: RoleListType
}

defineOptions({
    name: 'Roles',
    inheritAttrs: true,
})

// 存储搜索用的数据
const query = reactive({
    input: '',
})
// 弹窗控制器
const layer: GlobalDialogLayer<Nullable<RoleListType>> = reactive({
    show: false,
    title: '新增',
    showButton: true,
    disabledBtn: false,
    loadingBtn: false,
    width: '500px',
    row: null,
})
// 分页参数, 供table使用
const page: GlobalTablePage = reactive({
    index: 1,
    size: 20,
    total: 0,
})

const [loading, toggleLoading] = useToggle(false)
const tableData = ref<RoleListType[]>([])
const chooseData = ref<RoleListType[]>([])

// 更新选中
function onSelectionChange(val: any[]): any {
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
async function getTableData(init?: boolean) {
    const { stop } = useTimeoutFn(() => toggleLoading(true), 200)
    if (init) {
        page.index = 1
    }

    const params = {
        page: page.index,
        pageSize: page.size,
        ...query,
    }
    const { code, data } = await $axios.post<ResDataLists<RoleListType[]>>('/system/role/list', params)
    if (code === 200) {
        tableData.value = data.list.map(item => ({
            ...item,
            loading: false,
        }))
        page.total = Number(data.pager.total)
    }
    stop()
    toggleLoading(false)
}
// 删除功能
async function handleDel(data: RoleListType[]) {
    const params = {
        ids: data.map(e => e.id).join(','),
    }
    const { code } = await $axios.post<void>('/system/role/del', params)
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
    layer.title = '新增角色'
    layer.show = true
    layer.row = undefined
}
// 编辑弹窗功能
function handleEdit(row: RoleListType) {
    layer.title = '编辑角色'
    layer.row = row
    layer.show = true
}
// 搜索
function handleSubmit() {
    getTableData(true)
}

getTableData(true)
</script>
