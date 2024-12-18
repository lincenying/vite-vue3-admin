<template>
    <div class="global-box system-manage-user">
        <div class="global-box-form" flex>
            <div class="global-box-form-handle">
                <el-button type="primary" @click="handleAdd">
                    新增 <el-icon slots="icon" ml-5px><i-ep-plus /></el-icon>
                </el-button>
                <el-popconfirm title="确定删除选中的数据吗？" @confirm="handleDel(chooseData)">
                    <template #reference>
                        <el-button type="danger" :disabled="chooseData.length === 0">
                            批量删除 <el-icon slots="icon" ml-5px><i-ep-delete /></el-icon>
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
                prop-key="user"
                :data="tableData"
                @get-table-data="getTableData"
                @selection-change="onSelectionChange"
                @update-page="onUpdatePage"
            >
                <el-table-column prop="id" label="Id" align="center" width="80" />
                <el-table-column prop="name" label="用户名" align="center" />
                <el-table-column prop="nickName" label="昵称" align="center" />
                <el-table-column prop="role" label="角色" align="center" />
                <el-table-column prop="isAdmin" label="超级管理员" align="center">
                    <template #default="{ row }: ScopeRow">
                        <span class="mr-10px">{{ row.isAdmin === 1 ? "是" : "否" }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                    <template #default="{ row }: ScopeRow">
                        <span class="mr-10px">{{ row.status === 1 ? "启用" : "禁用" }}</span>
                        <el-switch
                            v-model="row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            :loading="row.loading"
                            @change="onUpdateStatus(row)"
                        />
                    </template>
                </el-table-column>
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
            <dialogUserModify v-if="layer.show" :layer="layer" @update="(payload: boolean) => layer.show = payload" @get-table-data="getTableData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer, GlobalTablePage } from '~/components/components.types'
import type { UpdatePageType, UserListType } from '~/types'

import { ElMessage } from '@/config/element'

interface ScopeRow {
    row: UserListType
}

defineOptions({
    name: 'Users',
    inheritAttrs: true,
})

// 存储搜索用的数据
const query = reactive({
    input: '',
})
// 弹窗控制器
const layer: GlobalDialogLayer<Nullable<UserListType>> = reactive({
    show: false,
    title: '新增',
    showButton: true,
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
const tableData = ref<UserListType[]>([])
const chooseData = ref<UserListType[]>([])

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
    const { code, data } = await $api.post<ResDataLists<UserListType[]>>('/system/user/list', params)
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
async function handleDel(data: UserListType[]) {
    const params = {
        ids: data.map((e) => {
            return e.id
        }).join(','),
    }
    const { code } = await $api.post<void>('/system/user/del', params)
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
function handleEdit(row: UserListType) {
    layer.title = '编辑数据'
    layer.row = row
    layer.show = true
}
// 状态编辑功能
async function onUpdateStatus(row: UserListType) {
    if (!row.id) {
        return
    }

    row.loading = true
    const params = {
        id: row.id,
        status: row.status,
    }
    const { code } = await $api.post<void>('/system/user/updateStatus', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '状态变更成功',
        })
    }
    row.loading = false
}
// 搜索
function handleSubmit() {
    getTableData(true)
}

getTableData(true)
</script>
