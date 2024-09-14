<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px" class="mr-30px">
            <el-form-item label="用户名：" prop="name">
                管理员
            </el-form-item>
            <el-form-item label="原密码：" prop="old">
                <el-input v-model="form.old" placeholder="请输入原密码" show-password />
            </el-form-item>
            <el-form-item label="新密码：" prop="new">
                <el-input v-model="form.new" placeholder="请输入新密码" show-password />
            </el-form-item>
        </el-form>
    </global-dialog>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer } from '~/components/components.types'
import type { FormInstance, GlobalDiaslogInstance } from '~/types'

import { ElMessage } from '~/config/element'

defineOptions({
    name: 'DialogPassword',
})

const { layer } = defineProps<{
    layer: GlobalDialogLayer<Objable>
}>()
const emit = defineEmits(['update'])

const userStore = useUserStore()

const ruleForm = ref<Nullable<FormInstance>>(null)
const layerDom = ref<Nullable<GlobalDiaslogInstance>>(null)

const form = ref({
    userId: '123465',
    name: '',
    old: '',
    new: '',
})
const rules = {
    old: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    new: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
}
function onSubmit() {
    if (ruleForm.value) {
        ruleForm.value.validate(async (valid) => {
            if (valid) {
                const params = {
                    id: form.value.userId,
                    old: form.value.old,
                    new: form.value.new,
                }
                const { code } = await $api.post<void>('/user/passwordChange', params)
                if (code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '密码修改成功，即将跳转到登录页面',
                    })
                    layerDom.value && layerDom.value.close()
                    setTimeout(() => {
                        userStore.logout()
                    }, 2000)
                }
            }
        })
    }
}
function onUpdate(payload: boolean) {
    emit('update', payload)
}
</script>
