<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px" class="mr-30px">
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
import type { FormInstance } from 'element-plus'
import { radioData, selectData } from './enum'
import { ElMessage } from '@/config/element'
import type { GlobalDialogLayer } from '@/components/components.types'
import type { GlobalDiaslogInstance } from '@/types'

defineOptions({
    name: 'DialogModify',
})

const { layer } = defineProps<{
    layer: GlobalDialogLayer<Obj>
}>()

const emit = defineEmits(['getTableData', 'update'])

const ruleForm = ref<Nullable<FormInstance>>(null)
const layerDom = ref<Nullable<GlobalDiaslogInstance>>(null)

const form = ref({
    name: '',
    number: '',
    choose: '',
    radio: '',
})
const rules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    number: [{ required: true, message: '请输入数字', trigger: 'blur' }],
    choose: [{ required: true, message: '请选择', trigger: 'blur' }],
    radio: [{ required: true, message: '请选择', trigger: 'blur' }],
}
function onSubmit() {
    if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
            if (valid) {
                const params = form
                if (layer.row)
                    updateForm(params)
                else
                    addForm(params)
            }
            else {
                return false
            }
        })
    }
}
// 新增提交事件
async function addForm(params: object) {
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
async function updateForm(params: object) {
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

function init() { // 用于判断新增还是编辑功能
    if (layer.row)
        form.value = JSON.parse(JSON.stringify(layer.row)) // 数量量少的直接使用这个转
}
init()
</script>
