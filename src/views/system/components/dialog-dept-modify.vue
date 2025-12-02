<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="7em">
            <el-form-item label="部门名称：" prop="name">
                <el-input v-model="form.name" placeholder="请输入部门名称" />
            </el-form-item>
            <el-form-item label="部门描述：" prop="desc">
                <el-input v-model="form.desc" placeholder="请输入部门描述" type="textarea" :rows="4" maxlength="100" show-word-limit />
            </el-form-item>
        </el-form>
    </global-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormItemRule } from 'element-plus'
import type { GlobalDialogLayer } from '~/types/components.types'
import type { GlobalDialogInstance } from '~/types/global.types'
import type { RoleListType } from '~/types/system.types'

import Rules from '@lincy/async-validation'
import globalDialog from '~/components/global-dialog.vue'
import { ElMessage } from '~/config/element'

defineOptions({
    name: 'DialogRoleModify',
})

const emit = defineEmits(['getTableData', 'update'])

const layer = defineModel<GlobalDialogLayer<Nullable<RoleListType>>>({ required: true })

const ruleForm = useTemplateRef<FormInstance>('ruleForm')
const layerDom = useTemplateRef<GlobalDialogInstance>('layerDom')

const form: RoleListType = reactive({
    id: '',
    name: '',
    desc: '',
})
const rules = {
    name: Rules.string('部门名称') as FormItemRule[],
    desc: Rules.string('部门描述') as FormItemRule[],
}

if (layer.value.row) {
    form.id = layer.value.row.id
    form.name = layer.value.row.name
    form.desc = layer.value.row.desc
}
function onSubmit() {
    if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
            if (valid) {
                const params = form
                if (layer.value.row) {
                    updateForm(params)
                }
                else {
                    addForm(params)
                }
            }
        })
    }
}
// 新增提交事件
async function addForm(params: object) {
    layer.value.loadingBtn = true
    const { code } = await $axios.post('/system/dept/add', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '新增成功',
        })
        emit('getTableData', true)
        layerDom.value?.close()
    }
    layer.value.loadingBtn = false
}
// 编辑提交事件
async function updateForm(params: object) {
    layer.value.loadingBtn = true
    const { code } = await $axios.post('/system/dept/update', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '编辑成功',
        })
        emit('getTableData', false)
        layerDom.value?.close()
    }
    layer.value.loadingBtn = false
}
function onUpdate(payload: boolean) {
    emit('update', payload)
}
</script>
