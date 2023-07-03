<template>
    <div class="global-table">
        <el-table v-bind="$attrs" ref="tableRef" class="system-table" border height="100%" :data="data" @selection-change="onSelectionChange">
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
            v-model:current-page="page.index"
            class="system-page"
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

<script lang="ts" setup>
import type { TableInstance } from 'element-plus'
import type { GlobalTablePage } from './components.types'

interface Props {
    data: any[]
    select?: any[]
    showIndex?: boolean
    showSelection?: boolean
    showPage?: boolean
    page: GlobalTablePage
    pageLayout?: string
    pageSizes?: number[]
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    select: () => [],
    showIndex: false,
    showSelection: false,
    showPage: true,
    page: () => ({ index: 1, size: 20, total: 0 }),
    pageLayout: 'total, sizes, prev, pager, next, jumper',
    pageSizes: () => [10, 20, 50, 100],
})

const emit = defineEmits(['getTableData', 'selectionChange', 'updatePage'])

console.log(JSON.parse(JSON.stringify(props)))

defineOptions({
    name: 'GlobalTable',
})

const { data, showIndex, showSelection, showPage, page, pageLayout, pageSizes } = $(toRefs(props))

const tableRef = ref<TableInstance>()
let timer: Nullable<string> = null
// 分页相关：监听页码切换事件
function handleCurrentChange(val: number) {
    if (timer)
        emit('updatePage', { key: 'index', value: 1 })

    else
        emit('updatePage', { key: 'index', value: val })
}
// 分页相关：监听单页显示数量切换事件
function handleSizeChange(val: number) {
    console.log(val)
    timer = 'work'
    setTimeout(() => {
        timer = null
    }, 100)
    emit('updatePage', [{ key: 'size', value: val }, { key: 'index', value: 1 }])
}
// 选择监听器
function onSelectionChange(val: []) {
    emit('selectionChange', val)
}
// 解决BUG：keep-alive组件使用时，表格浮层高度不对的问题
onActivated(() => {
    tableRef.value?.doLayout()
})
</script>
