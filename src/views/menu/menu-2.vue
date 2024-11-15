<template>
    <div class="menu-menu">
        <el-card class="m-15px">
            <el-form
                ref="ruleFormRef"
                style="max-width: 600px"
                :model="ruleForm"
                :rules="rulesObj"
                label-width="auto"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai" />
                        <el-option label="区域二" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="活动计数" prop="count">
                    <el-select-v2
                        v-model="ruleForm.count"
                        placeholder="活动计数"
                        :options="options"
                    />
                </el-form-item>
                <el-form-item label="活动时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker
                                v-model="ruleForm.date1"
                                type="date"
                                aria-label="请选择活动日期"
                                placeholder="请选择活动日期"
                                style="width: 100%"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col class="text-center" :span="2">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker
                                v-model="ruleForm.date2"
                                aria-label="请选择活动时间"
                                placeholder="请选择活动时间"
                                style="width: 100%"
                            />
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="ruleForm.delivery" />
                </el-form-item>
                <el-form-item label="活动地点" prop="location">
                    <el-segmented v-model="ruleForm.location" :options="locationOptions" />
                </el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox value="线上活动" name="type">
                            线上活动
                        </el-checkbox>
                        <el-checkbox value="推广活动" name="type">
                            推广活动
                        </el-checkbox>
                        <el-checkbox value="线下活动" name="type">
                            线下活动
                        </el-checkbox>
                        <el-checkbox value="简单的品牌曝光" name="type">
                            简单的品牌曝光
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="活动资源" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio value="赞助">赞助</el-radio>
                        <el-radio value="会场">会场</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import type { ComponentSize, FormInstance, FormItemRule, FormRules } from 'element-plus'
import rules from '@lincy/async-validation'

defineOptions({
    name: 'Mneu2',
})

interface RuleForm {
    name: string
    region: string
    count: string
    date1: string
    date2: string
    delivery: boolean
    location: string
    type: string[]
    resource: string
    desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: 'Hello',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    location: '',
    type: [],
    resource: '',
    desc: '',
})

const locationOptions = ['家', '公司', '学校']

const rulesObj = reactive<FormRules<RuleForm>>({
    name: rules.string('活动名称', 5, 3) as FormItemRule[],
    region: rules.select('活动区域') as FormItemRule[],
    count: rules.select('活动计数') as FormItemRule[],
    date1: rules.select('活动日期') as FormItemRule[],
    date2: rules.select('活动时间') as FormItemRule[],
    location: rules.select('活动地点') as FormItemRule[],
    type: rules.select('活动类型', true) as FormItemRule[],
    resource: rules.select('活动资源') as FormItemRule[],
    desc: rules.string('活动形式') as FormItemRule[],
})

async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl)
        return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        }
        else {
            console.log('error submit!', fields)
        }
    })
}

function resetForm(formEl: FormInstance | undefined) {
    if (!formEl)
        return
    formEl.resetFields()
}

const options = Array.from({ length: 10 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
</script>
