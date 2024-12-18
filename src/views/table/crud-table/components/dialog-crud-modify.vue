<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="mr-30px">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="数字：" prop="number">
                <el-input v-model="form.number" oninput="value=value.replace(/[^\d]/g,'')" placeholder="只能输入正整数" />
            </el-form-item>
            <el-form-item label="选择器：" prop="select">
                <el-select v-model="form.choose" placeholder="请选择" clearable>
                    <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="单选框：" prop="radio">
                <el-radio-group v-model="form.radio">
                    <el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </global-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormItemRule } from 'element-plus'
import type { GlobalDialogLayer } from '~/components/components.types'
import type { GlobalDiaslogInstance, TableListType } from '~/types'

import Rules from '@lincy/async-validation'

import { ElMessage } from '~/config/element'

import { radioData, selectData } from '~/views/table/enum'

defineOptions({
    name: 'DialogModify',
})

const { layer } = defineProps<{
    layer: GlobalDialogLayer<Nullable<TableListType>>
}>()

const emit = defineEmits(['getTableData', 'update'])

const ruleForm = $ref<Nullable<FormInstance>>(null)
const layerDom = $ref<Nullable<GlobalDiaslogInstance>>(null)

let form = $ref<TableListType>({
    id: undefined,
    name: undefined,
    number: undefined,
    choose: undefined,
    radio: undefined,
})
const rules = {
    name: Rules.string('姓名') as FormItemRule[],
    number: Rules.integer('数字') as FormItemRule[],
    choose: Rules.select('选择器') as FormItemRule[],
    radio: Rules.select('单选框') as FormItemRule[],
}

function onSubmit() {
    if (ruleForm) {
        ruleForm.validate((valid) => {
            if (valid) {
                if (layer.row) {
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
async function addForm(params: TableListType) {
    const { code } = await $api.post('/table/add', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '新增成功',
        })
        emit('getTableData', true)
        onUpdate(false)
    }
}
// 编辑提交事件
async function updateForm(params: TableListType) {
    const { code } = await $api.post('/table/update', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '编辑成功',
        })
        emit('getTableData', false)
        onUpdate(false)
    }
}
function onUpdate(payload: boolean) {
    emit('update', payload)
}

watchEffect(() => {
    if (layer.row) {
        form = deepClone(layer.row)
    }
})
</script>
