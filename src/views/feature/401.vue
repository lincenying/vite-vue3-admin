<template>
    <div class="global-box flex items-center justify-center text-center">
        <div class="system-401">
            <div class="pic-401">
                <img class="pic-401__parent" :src="first" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__oops">无权限访问!</div>
                <div class="bullshit__info">您没有访问权限，如需权限，请联系上级授权！</div>
                <el-button type="primary" round @click="router.push('/')">跳转首页</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import first from '~/assets/images/401.gif'

defineOptions({
    name: '401',
    inheritAttrs: true,
})

const router = useRouter()
</script>
