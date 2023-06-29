<template>
    <div class="system-table-box">
        <el-table
            v-bind="$attrs"
            ref="table"
            class="system-table"
            border
            height="100%"
            :data="data"
            @selection-change="handleSelectionChange"
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
import type { LayoutTableProps } from './components.types'

const props = withDefaults(defineProps<LayoutTableProps>(), {
    data: () => [],
    select: () => [],
    showIndex: false,
    showSelection: false,
    showPage: true,
    page: () => ({ index: 1, size: 20, total: 0 }),
    pageLayout: 'total, sizes, prev, pager, next, jumper',
    pageSizes: () => [10, 20, 50, 100],
})

const emit = defineEmits(['getTableData', 'selectionChange', 'updateProps'])

defineOptions({
    name: 'LayoutTable',
})

const {
    data,
    showIndex,
    showSelection,
    showPage,
    page,
    pageLayout,
    pageSizes,
} = $(toRefs(props))

const table: any = ref(null)
let timer: any = null
// 分页相关：监听页码切换事件
function handleCurrentChange(val: Number) {
    if (timer) {
        emit('updateProps', { key: 'index', value: 1 })
    }
    else {
        emit('updateProps', { key: 'index', value: val })
        emit('getTableData')
    }
}
// 分页相关：监听单页显示数量切换事件
function handleSizeChange(val: Number) {
    timer = 'work'
    setTimeout(() => {
        timer = null
    }, 100)
    emit('updateProps', { key: 'index', value: val })
    emit('getTableData', true)
}
// 选择监听器
function handleSelectionChange(val: []) {
    emit('selectionChange', val)
}
// 解决BUG：keep-alive组件使用时，表格浮层高度不对的问题
onActivated(() => {
    table.value.doLayout()
})
</script>

<style lang="scss" scoped>
  .system-table-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    .system-table {
      flex: 1;
      height: 100%;
    }

    .system-page {
      margin-top: 20px;
    }
  }
</style>
./components.types
