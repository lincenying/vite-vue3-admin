<template>
    <div class="system-login">
        <div class="box">
            <div class="login-content-left">
                <img :src="loginLeftPng">
                <div class="login-content-left-mask">
                    <div>后台管理系统</div>
                    <div>时间不在于你拥有多少,而在于你怎样使用。</div>
                </div>
            </div>

            <div class="box-inner">
                <h1>欢迎登录</h1>
                <el-form class="form">
                    <el-input v-model="form.name" size="large" placeholder="用户名" type="text" maxlength="50">
                        <template #prepend>
                            <i class="iconfont icon-user" />
                        </template>
                    </el-input>
                    <el-input v-model="form.password" size="large" :type="passwordType" placeholder="密码" name="password" maxlength="50">
                        <template #prepend>
                            <i class="iconfont icon-mima" />
                        </template>
                        <template #append>
                            <i class="iconfont password-icon" :class="passwordType ? 'icon-yanjing_yincang' : 'icon-yanjing_xianshi'" @click="passwordTypeChange" />
                        </template>
                    </el-input>

                    <el-button type="primary" :loading="form.loading" style="width: 100%" size="default" @click="handleSubmit">登录</el-button>
                </el-form>
                <div class="fixed-top-right" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElMessage } from '@/config/element'
import loginLeftPng from '@/assets/login/left.jpg'

defineOptions({
    name: 'Login',
    inheritAttrs: true,
})

const userStore = useUserStore()

const form = reactive({
    name: 'admin',
    password: '123456',
    loading: false,
})
const passwordType = ref('password')

function passwordTypeChange() {
    passwordType.value === '' ? (passwordType.value = 'password') : (passwordType.value = '')
}

function checkForm() {
    return new Promise((resolve) => {
        if (form.name === '') {
            ElMessage.warning({
                message: '用户名不能为空',
                type: 'warning',
            })
            return
        }
        if (form.password === '') {
            ElMessage.warning({
                message: '密码不能为空',
                type: 'warning',
            })
            return
        }
        resolve(true)
    })
}
function handleSubmit() {
    checkForm().then(() => {
        form.loading = true
        const params = {
            name: form.name,
            password: form.password,
        }
        userStore
            .login(params)
            .then(async () => {
                ElMessage.success({
                    message: '登录成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000,
                })
                location.reload()
                // await getAuthRoutes()
                // await router.push(route.query.redirect as RouteLocationRaw || '/')
            })
            .finally(() => {
                form.loading = false
            })
    })
}
</script>
