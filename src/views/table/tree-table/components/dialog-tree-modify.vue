<template>
    <global-dialog
        ref="layerDom"
        :layer="layer"
        @update="onUpdate"
        @confirm="onSubmit"
    >
        <el-form
            ref="ruleForm"
            :model="form"
            :rules="rules"
            label-width="6em"
        >
            <el-form-item label="名称：" prop="label">
                <el-input v-model="form.label" placeholder="请输入名称" />
            </el-form-item>
        </el-form>
    </global-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormItemRule } from 'element-plus'
import type { GlobalDialogLayer } from '~/types/components.types'
import type { GlobalDialogInstance } from '~/types/global.types'
import type { DeptListType } from '~/types/table.types'

import Rules from '@lincy/async-validation'

import { ElMessage } from '~/config/element'

defineOptions({
    name: 'DialogTreeModify',
})

const emit = defineEmits(['getTableData', 'update'])

const layer = defineModel<GlobalDialogLayer<DeptListType>>({ required: true })

const ruleForm = useTemplateRef<FormInstance>('ruleForm')
const layerDom = useTemplateRef<GlobalDialogInstance>('layerDom')

let form = $ref<DeptListType>({
    id: undefined,
    label: undefined,
})
const rules = {
    label: Rules.string('名称') as FormItemRule[],
}

function onSubmit() {
    if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
            if (valid) {
                if (layer.value.row) {
                    updateForm(form)
                }
                else {
                    addForm(form)
                }
            }
        })
    }
}
// 新增提交事件
async function addForm(params: DeptListType) {
    layer.value.loadingBtn = true
    const { code } = await $axios.post('/table/add', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '新增成功',
        })
        emit('getTableData', true)
        onUpdate(false)
    }
    layer.value.loadingBtn = false
}
// 编辑提交事件
async function updateForm(params: DeptListType) {
    layer.value.loadingBtn = true
    const { code } = await $axios.post('/table/update', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '编辑成功',
        })
        emit('getTableData', false)
        onUpdate(false)
    }
    layer.value.loadingBtn = false
}
function onUpdate(payload: boolean) {
    emit('update', payload)
}

function init() {
    // 用于判断新增还是编辑功能
    if (layer.value.row) {
        form = deepClone(layer.value.row)
    } // 数量量少的直接使用这个转
}
init()
</script>
