<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form
            ref="ruleForm"
            :model="form"
            :rules="rules"
            label-width="120px"
            class="mr-30px"
        >
            <el-form-item label="角色名称：" prop="name">
                <el-input v-model="form.name" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="角色描述：" prop="desc">
                <el-input v-model="form.desc" placeholder="请输入角色描述" type="textarea" :rows="4" maxlength="100" show-word-limit />
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

const { layer } = defineProps<{
    layer: GlobalDialogLayer<Nullable<RoleListType>>
}>()

const emit = defineEmits(['getTableData', 'update'])

const ruleForm = $ref<Nullable<FormInstance>>(null)
const layerDom = $ref<Nullable<GlobalDialogInstance>>(null)

const form: RoleListType = reactive({
    id: '',
    name: '',
    desc: '',
})
const rules = {
    name: Rules.string('角色名称') as FormItemRule[],
    desc: Rules.string('角色描述') as FormItemRule[],
}

if (layer.row) {
    form.id = layer.row.id
    form.name = layer.row.name
    form.desc = layer.row.desc
}
function onSubmit() {
    if (ruleForm) {
        ruleForm.validate((valid) => {
            if (valid) {
                const params = form
                if (layer.row) {
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
    const { code } = await $api.post('/system/role/add', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '新增成功',
        })
        emit('getTableData', true)
        layerDom?.close()
    }
}
// 编辑提交事件
async function updateForm(params: object) {
    const { code } = await $api.post('/system/role/update', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '编辑成功',
        })
        emit('getTableData', false)
        layerDom?.close()
    }
}
function onUpdate(payload: boolean) {
    emit('update', payload)
}
</script>
