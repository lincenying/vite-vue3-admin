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
            </div>
        </div>
        <div class="global-box-table">
            <globalTable
                v-loading="loading"
                :show-selection="true"
                prop-key="role"
                :data="tableData"
                :show-page="false"
                :other-config="{ stripe: true, defaultExpandAll: false }"
                @get-table-data="getTableData"
                @selection-change="onSelectionChange"
            >
                <el-table-column prop="name" label="部门名称" width="180" />
                <el-table-column prop="desc" label="部门描述" />
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
            <dialog-dept-modify
                v-if="layer.show"
                :layer="layer"
                @update="(payload: boolean) => (layer.show = payload)"
                @get-table-data="getTableData"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer } from '~/types/components.types'
import type { DeptListType } from '~/types/system.types'

import { ElMessage } from '@/config/element'

interface ScopeRow {
    row: DeptListType
}

defineOptions({
    name: 'Roles',
    inheritAttrs: true,
})

// 弹窗控制器
const layer: GlobalDialogLayer<Nullable<DeptListType>> = reactive({
    show: false,
    title: '新增',
    showButton: true,
    width: '500px',
    row: null,
})

const [loading, toggleLoading] = useToggle(false)
const tableData = ref<DeptListType[]>([])
const chooseData = ref<DeptListType[]>([])

// 更新选中
function onSelectionChange(val: any[]): any {
    chooseData.value = val
}

// 获取表格数据
// params <init> Boolean ，默认为false，用于判断是否需要初始化分页
async function getTableData() {
    const { stop } = useTimeoutFn(() => toggleLoading(true), 200)

    const params = {}
    const { code, data } = await $api.post<ResDataLists<DeptListType[]>>(
        '/system/dept/list',
        params,
    )
    if (code === 200) {
        tableData.value = data.list.map(item => ({
            ...item,
            loading: false,
        }))
    }
    stop()
    toggleLoading(false)
}
// 删除功能
async function handleDel(data: DeptListType[]) {
    const params = {
        ids: data.map(e => e.id).join(','),
    }
    const { code } = await $api.post<void>('/system/dept/del', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        getTableData()
    }
}
// 新增弹窗功能
function handleAdd() {
    layer.title = '新增部门'
    layer.show = true
    layer.row = undefined
    layer.showCancel = true
}
// 编辑弹窗功能
function handleEdit(row: DeptListType) {
    layer.title = '编辑部门'
    layer.row = row
    layer.show = true
    layer.showCancel = true
}

getTableData()
</script>
