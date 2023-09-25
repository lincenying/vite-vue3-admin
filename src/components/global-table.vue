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

<script lang="ts" setup generic="T extends string">
import type { TableInstance } from 'element-plus'
import type { GlobalTablePage } from './components.types'
import type { TableListType, UpdatePageType, UserListType } from '@/types'

type DataType<Key> = Key extends 'user' ? UserListType : (Key extends 'table' ? TableListType : unknown)

interface Props {
    propKey?: T
    data: DataType<T>[]
    select?: any[]
    showIndex?: boolean
    showSelection?: boolean
    showPage?: boolean
    page: GlobalTablePage
    pageLayout?: string
    pageSizes?: number[]
}

// ['getTableData', 'selectionChange', 'updatePage']

defineOptions({
    name: 'GlobalTable',
})

/** 使用 withDefaults 后, 不能直接解构 */
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

const emit = defineEmits<{
    (event: 'updatePage', palyload: UpdatePageType | UpdatePageType[]): void
    (event: 'selectionChange', palyload: any[]): void
}>()

const { data, showIndex, showSelection, showPage, page, pageLayout, pageSizes } = $(toRefs(props))

const tableRef = ref<TableInstance>()
let timer: Nullable<string> = null
// 分页相关：监听页码切换事件
function handleCurrentChange(val: number) {
    emit('updatePage', { key: 'index', value: timer ? 1 : val })
}
// 分页相关：监听单页显示数量切换事件
function handleSizeChange(val: number) {
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
