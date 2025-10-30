<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="8em">
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="form.name" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="昵称：" prop="nickName">
                <el-input v-model="form.nickName" placeholder="请输入昵称" />
            </el-form-item>
            <!-- <el-form-item label="数字：" prop="sort">
                <el-input v-model="form.sort" oninput="value=value.replace(/[^\d]/g,'')" placeholder="只能输入正整数" />
            </el-form-item> -->
            <el-form-item label="角色：" prop="role">
                <el-select v-model="form.role" placeholder="请选择" clearable>
                    <el-option v-for="item in options" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="超级管理员：" prop="isAdmin">
                <el-radio-group v-model="form.isAdmin">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </global-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormItemRule } from 'element-plus'
import type { GlobalDialogLayer } from '~/types/components.types'
import type { GlobalDialogInstance } from '~/types/global.types'
import type { UserListType } from '~/types/system.types'

import Rules from '@lincy/async-validation'
import globalDialog from '~/components/global-dialog.vue'
import { ElMessage } from '~/config/element'

defineOptions({
    name: 'DialogUserModify',
})

const emit = defineEmits(['getTableData', 'update'])
const layer = defineModel<GlobalDialogLayer<Nullable<UserListType>>>({ required: true })
const ruleForm = useTemplateRef<FormInstance>('ruleForm')
const layerDom = useTemplateRef<GlobalDialogInstance>('layerDom')

const form: UserListType = reactive({
    id: '',
    name: '',
    nickName: '',
    role: '',
    isAdmin: '',
    status: '',
})
const rules = {
    name: Rules.string('姓名') as FormItemRule[],
    sort: Rules.integer('数字') as FormItemRule[],
    role: Rules.select('角色') as FormItemRule[],
    isAdmin: Rules.select('超级管理员') as FormItemRule[],
    status: Rules.select('状态') as FormItemRule[],
}
const options = [
    '系统管理员',
    '平台管理员',
    '数据统计人员',
    '信息录入人员',
    '普通人员',
]

if (layer.value.row) {
    form.id = layer.value.row.id
    form.name = layer.value.row.name
    form.role = layer.value.row.role
    form.nickName = layer.value.row.nickName
    form.isAdmin = layer.value.row.isAdmin
    form.status = layer.value.row.status
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
    const { code } = await $api.post('/system/user/add', params)
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
    const { code } = await $api.post('/system/user/update', params)
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
