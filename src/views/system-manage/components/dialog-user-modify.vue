<template>
    <layoutDialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px" style="margin-right:30px;">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="数字：" prop="sort">
                <el-input v-model="form.sort" oninput="value=value.replace(/[^\d]/g,'')" placeholder="只能输入正整数" />
            </el-form-item>
            <el-form-item label="选择器：" prop="select">
                <el-select v-model="form.select" placeholder="请选择" clearable>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="单选框：" prop="radio">
                <el-radio-group v-model="form.radio">
                    <el-radio :label="0">最新开播</el-radio>
                    <el-radio :label="1">最早开播</el-radio>
                    <el-radio :label="2">最多观看</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </layoutDialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from '@/config/element'
import layoutDialog from '@/components/layout-dialog.vue'
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
    name: 'DialogUserModify',
})

const ruleForm = ref<FormInstance>()
const layerDom = ref<LayerType>()

const form = reactive({
    name: '',
    sort: '',
    select: '',
    radio: '',
})
const rules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    sort: [{ required: true, message: '请输入数字', trigger: 'blur' }],
    select: [{ required: true, message: '请选择', trigger: 'blur' }],
    radio: [{ required: true, message: '请选择', trigger: 'blur' }],
}
const options = [
    { value: 1, label: '运动' },
    { value: 2, label: '健身' },
    { value: 3, label: '跑酷' },
    { value: 4, label: '街舞' },
]
function onSubmit() {
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
async function addForm(params: object) {
    const { code } = await $api.post('/user/add', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '新增成功',
        })
        emit('getTableData', true)
        layerDom.value?.close()
    }
}
// 编辑提交事件
async function updateForm(params: object) {
    const { code } = await $api.post('/user/update', params)
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '编辑成功',
        })
        emit('getTableData', false)
        layerDom.value?.close()
    }
}
function onUpdate(payload: boolean) {
    emit('update', payload)
}
</script>
