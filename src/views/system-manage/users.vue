<template>
    <div class="layout-container">
        <div class="layout-container-form space-between flex">
            <div class="layout-container-form-handle">
                <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
                <el-popconfirm
                    title="确定删除选中的数据吗？"
                    @confirm="handleDel(chooseData)"
                >
                    <template #reference>
                        <el-button
                            type="danger"
                            :icon="Delete"
                            :disabled="chooseData.length === 0"
                        >
                            批量删除
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <div class="layout-container-form-search">
                <el-input
                    v-model="query.input"
                    placeholder="请输入关键词进行检索"
                />
                <el-button
                    type="primary"
                    :icon="Search"
                    class="search-btn"
                    @click="getTableData(true)"
                >
                    搜索
                </el-button>
            </div>
        </div>
        <div class="layout-container-table">
            <LayoutTable
                v-model:page="page"
                v-loading="loading"
                :show-selection="true"
                :data="tableData"
                @get-table-data="getTableData"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="id" label="Id" align="center" width="80" />
                <el-table-column prop="name" label="用户名" align="center" />
                <el-table-column prop="nickName" label="昵称" align="center" />
                <el-table-column prop="role" label="角色" align="center" />
                <el-table-column prop="isAdmin" label="超级管理员" align="center">
                    <template #default="scope">
                        <span class="statusName">{{ scope.row.isAdmin === 1 ? "是" : "否" }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                    <template #default="scope">
                        <span class="statusName">{{ scope.row.status === 1 ? "启用" : "禁用" }}</span>
                        <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            :loading="scope.row.loading"
                            @change="handleUpdateStatus(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    fixed="right"
                    width="200"
                >
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm
                            title="确定删除选中的数据吗？"
                            @confirm="handleDel([scope.row])"
                        >
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </LayoutTable>
            <UserDialogModify v-if="layer.show" :layer="layer" @update="(payload: boolean) => layer.show = payload" @get-table-data="getTableData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Delete, Plus, Search } from '@element-plus/icons'
import UserDialogModify from './users/dialog-user-modify.vue'
import { ElMessage } from '@/config/element'
import LayoutTable from '@/components/layout-table.vue'
import type { LayoutDialogLayer, LayoutTablePage } from '@/components/components.types'

defineOptions({
    name: 'Users',
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
async function getTableData(init?: Boolean) {
    loading.value = true
    if (init)
        page.index = 1

    const params = {
        page: page.index,
        pageSize: page.size,
        ...query,
    }
    const { code, data } = await $api.post<ResponseDataLists<any[]>>('/system/user/list', params)
    if (code === 200) {
        data.list.forEach((d: any) => {
            d.loading = false
        })
        tableData.value = data.list
        page.total = Number(data.pager.total)
    }
    loading.value = false
}
// 删除功能
async function handleDel(data: object[]) {
    const params = {
        ids: data.map((e: any) => { return e.id }).join(','),
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
    delete layer.row
}
// 编辑弹窗功能
function handleEdit(row: any) {
    layer.title = '编辑数据'
    layer.row = row
    layer.show = true
}
// 状态编辑功能
async function handleUpdateStatus(row: any) {
    if (!row.id)
        return

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
getTableData(true)
</script>

<style lang="scss" scoped>
.statusName {
  margin-right: 10px;
}
</style>
