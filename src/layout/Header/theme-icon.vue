<template>
    <el-tooltip effect="dark" :content="tip" placement="top">
        <div class="theme-icon" @click="handleClick">
            <div class="theme-icon-sidebar">
                <div class="theme-icon-sidebar-logo" :style="{ 'background-color': logo }" />
                <div class="theme-icon-sidebar-menu" :style="{ 'background-color': menu }" />
            </div>
            <div class="theme-icon-content">
                <div class="theme-icon-content-header" :style="{ 'background-color': header }" />
                <div class="theme-icon-content-main" :style="{ 'background-color': main }">
                    <div v-if="active === name" class="active">
                        <i class="iconfont icon-chenggong" :style="{ color: activeColor }" />
                    </div>
                </div>
            </div>
        </div>
    </el-tooltip>
</template>

<script lang="ts" setup>
interface Props {
    name: string
    active: string
    menu: string
    logo: string
    header: string
    main: string
    tip: string
    activeColor: string
}

defineOptions({
    name: 'ThemeIcon',
})

/** 使用 withDefaults 后, 不能直接解构 */
const props = withDefaults(defineProps<Props>(), {
    name: 'default',
    active: '',
    menu: '',
    logo: '',
    header: '',
    main: '',
    tip: '默认菜单风格',
    activeColor: '',
})

const emit = defineEmits(['update:active'])

const { name } = $(toRefs(props))

// 点击事件，触发v-model修改active值
function handleClick() {
    emit('update:active', name)
}
</script>
