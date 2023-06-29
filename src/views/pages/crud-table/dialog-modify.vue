<template>
    <layoutDialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="submit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px" style="margin-right:30px;">
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
    </layoutDialog>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { radioData, selectData } from './enum'
import { add, update } from '@/api/table'
import type { LayerType, LayoutDialogProps } from '@/components/components.types'

const props = withDefaults(defineProps<LayoutDialogProps>(), {
    layer: () => ({
        show: false,
        title: '',
        showButton: false,
    }),
})

const emit = defineEmits(['getTableData', 'update'])

defineOptions({
    name: 'DialogModify',
})

const ruleForm: Ref<FormInstance | null> = ref(null)
const layerDom: Ref<LayerType | null> = ref(null)
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
function init() { // 用于判断新增还是编辑功能
    if (props.layer.row)
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
}
init()
function submit() {
    if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
            if (valid) {
                const params = form
                if (props.layer.row)
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
function addForm(params: object) {
    add(params)
        .then(() => {
            ElMessage({
                type: 'success',
                message: '新增成功',
            })
            emit('getTableData', true)
            layerDom.value && layerDom.value.close()
        })
}
// 编辑提交事件
function updateForm(params: object) {
    update(params)
        .then(() => {
            ElMessage({
                type: 'success',
                message: '编辑成功',
            })
            emit('getTableData', false)
            layerDom.value && layerDom.value.close()
        })
}
function onUpdate(payload: boolean) {
    emit('update', payload)
}
</script>

<style lang="scss" scoped>

</style>
