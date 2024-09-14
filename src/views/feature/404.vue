<template>
    <div class="global-box flex items-center justify-center text-center">
        <div class="system-404">
            <div class="pic-404">
                <img class="pic-404__parent" :src="four" alt="404">
                <img class="left pic-404__child" :src="four_cloud" alt="404">
                <img class="pic-404__child mid" :src="four_cloud" alt="404">
                <img class="pic-404__child right" :src="four_cloud" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__oops">页面不存在!</div>
                <div class="bullshit__info">请检查您输入的网址是否正确，或单击下面的按钮返回主页</div>
                <el-button type="primary" round @click="router.push('/')">跳转首页</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import four from '~/assets/images/404.png'
import four_cloud from '~/assets/images/404_cloud.png'

defineOptions({
    name: '404',
    inheritAttrs: true,
})

const router = useRouter()
</script>
