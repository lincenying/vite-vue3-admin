<template>
    <div class="table-tree-left">
        <div class="header-box">
            <h2>组织管理</h2>
            <!-- <el-input
                v-model="input"
                placeholder="请输入内容"
                @input="searchData(true)"
            ></el-input> -->
        </div>
        <div class="list system-scrollbar">
            <el-tree
                ref="tree"
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
    </div>
</template>

<script lang="ts" setup>
import type { TreeInstance } from '~/types/global.types'
import type { TreeType } from '~/types/table.types'

import { Edit } from '@element-plus/icons-vue'

defineOptions({
    name: 'Tree',
    inheritAttrs: true,
})

const treeData = ref<TreeType[]>([])
const tree = ref<TreeInstance>()

const defaultProps = {
    children: 'children',
    label: 'label',
}

const activeTree = inject(activeTreeKey, ref({} as TreeType))
const updateActiveTree = inject(updateActiveTreeKey, () => {})

async function getTreeData() {
    const params = {}
    const { code, data } = await $api.post<TreeType[]>('/table/tree', params)
    if (code === 200) {
        treeData.value = data
        updateActiveTree(data[0])
        nextTick(() => {
            tree.value && tree.value.setCurrentKey(activeTree.value.id)
        })
    }
}
function handleNodeClick(row: TreeType) {
    updateActiveTree(row)
}

function handleEdit(row: TreeType) {
    console.log(row)
}

getTreeData()
</script>
