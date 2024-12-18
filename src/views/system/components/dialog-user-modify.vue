<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px" class="mr-30px">
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
                    <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="超级管理员：" prop="isAdmin">
                <el-radio-group v-model="form.isAdmin">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态：" prop="isAdmin">
                <el-radio-group v-model="form.isAdmin">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </global-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormItemRule } from 'element-plus'
import type { GlobalDialogLayer } from '~/components/components.types'
import type { GlobalDiaslogInstance, UserListType } from '~/types'

import Rules from '@lincy/async-validation'

import globalDialog from '~/components/global-dialog.vue'
import { ElMessage } from '~/config/element'

defineOptions({
    name: 'DialogUserModify',
})

const { layer } = defineProps<{
    layer: GlobalDialogLayer<Nullable<UserListType>>
}>()

const emit = defineEmits(['getTableData', 'update'])

const ruleForm = $ref<Nullable<FormInstance>>(null)
const layerDom = $ref<Nullable<GlobalDiaslogInstance>>(null)

const form: UserListType = reactive({
    id: '',
    name: '',
    nickName: '',
    role: '',
    isAdmin: '',
})
const rules = {
    name: Rules.string('姓名') as FormItemRule[],
    sort: Rules.integer('数字') as FormItemRule[],
    role: Rules.select('角色') as FormItemRule[],
    isAdmin: Rules.select('超级管理员') as FormItemRule[],
}
const options = ['系统管理员', '平台管理员', '数据统计人员', '信息录入人员', '普通人员']

if (layer.row) {
    form.id = layer.row.id
    form.name = layer.row.name
    form.role = layer.row.role
    form.nickName = layer.row.nickName
    form.isAdmin = layer.row.isAdmin
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
    const { code } = await $api.post('/system/user/add', params)
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
    const { code } = await $api.post('/system/user/update', params)
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
