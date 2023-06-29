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
            <CompTable
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
            </CompTable>
            <Layer v-if="layer.show" :layer="layer" @get-table-data="getTableData" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Plus, Search } from '@element-plus/icons'
import Layer from './layer.vue'
import { radioData, selectData } from './enum'
import CompTable from '@/components/table/index.vue'
import type { Page } from '@/components/table/type'
import { del, getData } from '@/api/table'
import type { LayerInterface } from '@/components/layer/index.vue'

export default defineComponent({
    components: {
        CompTable,
        Layer,
    },
    setup() {
    // 存储搜索用的数据
        const query = reactive({
            input: '',
        })
        // 弹窗控制器
        const layer: LayerInterface = reactive({
            show: false,
            title: '新增',
            showButton: true,
        })
        // 分页参数, 供table使用
        const page: Page = reactive({
            index: 1,
            size: 20,
            total: 0,
        })
        const activeCategory: any = inject('active')
        const loading = ref(true)
        const tableData = ref([])
        const chooseData = ref([])
        const handleSelectionChange = (val: []) => {
            chooseData.value = val
        }
        // 获取表格数据
        // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
        const getTableData = (init: boolean) => {
            loading.value = true
            if (init)
                page.index = 1

            const params = {
                category: activeCategory.value.id,
                page: page.index,
                pageSize: page.size,
                ...query,
            }
            getData(params)
                .then((res) => {
                    const data = res.data.list
                    if (Array.isArray(data)) {
                        data.forEach((d) => {
                            const select = selectData.find(select => select.value === d.choose)
                            select ? d.chooseName = select.label : d.chooseName = d.choose
                            const radio = radioData.find(select => select.value === d.radio)
                            if (radio)
                                d.radioName = radio.label
                            else
                                d.radioName = d.radio
                        })
                    }
                    tableData.value = res.data.list
                    page.total = Number(res.data.pager.total)
                })
                .catch(() => {
                    tableData.value = []
                    page.index = 1
                    page.total = 0
                })
                .finally(() => {
                    loading.value = false
                })
        }
        // 删除功能
        const handleDel = (data: object[]) => {
            const params = {
                ids: data.map((e: any) => {
                    return e.id
                }).join(','),
            }
            del(params)
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                    getTableData(tableData.value.length === 1)
                })
        }
        // 新增弹窗功能
        const handleAdd = () => {
            layer.title = '新增数据'
            layer.show = true
            delete layer.row
        }
        // 编辑弹窗功能
        const handleEdit = (row: object) => {
            layer.title = '编辑数据'
            layer.row = row
            layer.show = true
        }
        watch(activeCategory, () => {
            getTableData(true)
        })
        // getTableData(true)
        return {
            Plus,
            Search,
            Delete,
            query,
            tableData,
            chooseData,
            loading,
            page,
            layer,
            handleSelectionChange,
            handleAdd,
            handleEdit,
            handleDel,
            getTableData,
        }
    },
})
</script>

<style lang="scss" scoped>
  .layout-container {
    width: calc(100% - 10px);
    height: 100%;
    margin: 0 0 0 10px;
  }
</style>
