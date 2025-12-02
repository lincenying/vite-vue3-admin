<template>
    <div class="table-tree-left">
        <div class="header-box">
            <h2>部门管理</h2>
            <!-- <el-input
                v-model="input"
                placeholder="请输入内容"
                @input="searchData(true)"
            ></el-input> -->
        </div>
        <div class="list system-scrollbar">
            <el-tree
                ref="elTreeRef"
                class="my-tree"
                :data="treeData"
                :props="defaultProps"
                :expand-on-click-node="false"
                node-key="id"
                highlight-current
                default-expand-all
                @node-click="handleNodeClick"
            >
                <template #default="{ node, data }">
                    <div flex="~ items-center">
                        <span>{{ node.label }}</span>
                        <el-button type="text" class="ml-5px" :icon="Edit" circle @click.stop="handleEdit(data)"></el-button>
                    </div>
                </template>
            </el-tree>
        </div>
        <dialog-tree-modify
            v-if="layer.show"
            v-model="layer"
            @update="(payload: boolean) => (layer.show = payload)"
            @get-table-data="getTreeData"
        />
    </div>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer } from '~/types/components.types'
import type { TreeInstance } from '~/types/global.types'

import type { DeptListType, TreeType } from '~/types/table.types'
import { Edit } from '@element-plus/icons-vue'

defineOptions({
    name: 'CompTree',
    inheritAttrs: true,
})

const treeData = ref<TreeType[]>([])
const elTreeRef = useTemplateRef<TreeInstance>('treeRef')

const defaultProps = {
    children: 'children',
    label: 'label',
}

const activeTree = inject(activeTreeKey, ref({} as TreeType))
const updateActiveTree = inject(updateActiveTreeKey, () => {})

async function getTreeData() {
    const params = {}
    const { code, data } = await $axios.post<TreeType[]>('/table/tree', params)
    if (code === 200) {
        treeData.value = data
        updateActiveTree(data[0])
        nextTick(() => {
            elTreeRef.value && elTreeRef.value.setCurrentKey(activeTree.value.id)
        })
    }
}
function handleNodeClick(row: TreeType) {
    updateActiveTree(row)
}

// 弹窗控制器
const layer: GlobalDialogLayer<DeptListType> = reactive({
    show: false,
    title: '新增',
    showButton: true,
    disabledBtn: false,
    loadingBtn: false,
    width: '500px',
})

function handleEdit(row: DeptListType) {
    layer.title = '编辑数据'
    layer.row = row
    layer.show = true
}

getTreeData()
</script>
