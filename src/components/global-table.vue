<template>
    <div class="global-table">
        <el-table
            v-bind="{ ...$attrs, ...tableConfig }"
            ref="tableRef"
            class="system-table"
            border height="100%"
            :data="data"
            row-key="id"
            @selection-change="onSelectionChange"
        >
            <el-table-column v-if="showSelection" type="selection" align="center" width="50" />
            <el-table-column v-if="showIndex" label="序号" width="60" align="center">
                <template #default="scope">
                    {{ (page.index - 1) * page.size + scope.$index + 1 }}
                </template>
            </el-table-column>
            <slot />
        </el-table>
        <el-pagination
            v-if="showPage"
            v-model:current-page="currPage"
            class="system-page"
            v-bind="pageConfig"
            background
            :layout="pageLayout"
            :total="page.total"
            :page-size="page.size"
            :page-sizes="pageSizes"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
    </div>
</template>

<script lang="ts" setup generic="T extends keyof TypeMap">
import type { TableInstance } from 'element-plus'
import type { GlobalTableProps, TypeMap } from '../types/components.types'
import type { UpdatePageType } from '~/types/table.types'

// ['getTableData', 'selectionChange', 'updatePage']

defineOptions({
    name: 'GlobalTable',
})

const {
    data = [],
    showIndex = false,
    showSelection = false,
    showPage = true,
    page = { index: 1, size: 20, total: 0 },
    pageLayout = 'total, sizes, prev, pager, next, jumper',
    pageSizes = [10, 20, 50, 100],
    tableConfig = {},
    pageConfig = {},
} = defineProps<GlobalTableProps<T>>()

const emit = defineEmits<{
    (event: 'updatePage', palyload: UpdatePageType | UpdatePageType[]): void
    (event: 'selectionChange', palyload: any[]): void
}>()

const currPage = ref<number>(1)

const tableRef = ref<TableInstance>()
let timer: Nullable<string> = null

/** 重置表格滚动条位置 */
function resetScroll(top: number = 0) {
    tableRef.value?.setScrollTop(top)
}

/** 分页相关：监听页码切换事件 */
function handleCurrentChange(val: number) {
    tableRef.value?.setScrollTop(0)
    emit('updatePage', { key: 'index', value: timer ? 1 : val })
}

/** 分页相关：监听单页显示数量切换事件 */
function handleSizeChange(val: number) {
    timer = 'work'
    setTimeout(() => {
        timer = null
    }, 100)
    tableRef.value?.setScrollTop(0)
    currPage.value = 1
    emit('updatePage', [
        { key: 'size', value: val },
        { key: 'index', value: 1 },
    ])
}

/** 选择监听器 */
function onSelectionChange(val: []) {
    emit('selectionChange', val)
}

/** 解决BUG：keep-alive组件使用时，表格浮层高度不对的问题 */
onActivated(() => {
    tableRef.value?.doLayout()
})

defineExpose({
    resetScroll,
})
</script>
