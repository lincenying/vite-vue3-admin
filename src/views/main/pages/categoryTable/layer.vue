<template>
    <Layer ref="layerDom" :layer="layer" @confirm="submit">
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
    </Layer>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { defineComponent, ref } from 'vue'
import { radioData, selectData } from './enum'
import { add, update } from '@/api/table'
import type { LayerType } from '@/components/layer/index.vue'
import Layer from '@/components/layer/index.vue'

export default defineComponent({
    components: {
        Layer,
    },
    props: {
        layer: {
            type: Object,
            default: () => {
                return {
                    show: false,
                    title: '',
                    showButton: true,
                }
            },
        },
    },
    setup(props, ctx) {
        const ruleForm: Ref<ElFormItemContext | null> = ref(null)
        const layerDom: Ref<LayerType | null> = ref(null)
        const form = ref({
            name: '',
        })
        const rules = {
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            number: [{ required: true, message: '请输入数字', trigger: 'blur' }],
            choose: [{ required: true, message: '请选择', trigger: 'blur' }],
            radio: [{ required: true, message: '请选择', trigger: 'blur' }],
        }
        init()
        function init() { // 用于判断新增还是编辑功能
            if (props.layer.row) {
                form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
            }
            else {

            }
        }
        return {
            form,
            rules,
            layerDom,
            ruleForm,
            selectData,
            radioData,
        }
    },
    methods: {
        submit() {
            if (this.ruleForm) {
                this.ruleForm.validate((valid) => {
                    if (valid) {
                        const params = this.form
                        if (this.layer.row)
                            this.updateForm(params)
                        else
                            this.addForm(params)
                    }
                    else {
                        return false
                    }
                })
            }
        },
        // 新增提交事件
        addForm(params: object) {
            add(params)
                .then((res) => {
                    this.$message({
                        type: 'success',
                        message: '新增成功',
                    })
                    this.$emit('getTableData', true)
                    this.layerDom && this.layerDom.close()
                })
        },
        // 编辑提交事件
        updateForm(params: object) {
            update(params)
                .then((res) => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功',
                    })
                    this.$emit('getTableData', false)
                    this.layerDom && this.layerDom.close()
                })
        },
    },
})
</script>

<style lang="scss" scoped>

</style>
