<template>
    <el-tooltip effect="dark" :content="tip" placement="top">
        <div class="theme-color" :style="{ 'background-color': color }" @click="handleClick">
            <div v-if="active === color" class="active">
                <i class="iconfont icon-chenggong" :style="{ color: textColor }" />
            </div>
        </div>
    </el-tooltip>
</template>

<script lang="ts" setup>
interface Props {
    active: string
    activeTextColor: string
    tip: string
    color: string
    textColor: string
}

defineOptions({
    name: 'ThemeColor',
})

/** 使用 withDefaults 后, 不能直接解构 */
const props = withDefaults(defineProps<Props>(), {
    active: '',
    activeTextColor: '',
    tip: '默认蓝',
    color: '#409eff',
    textColor: '#fff',
})

const emit = defineEmits(['update:active', 'update:activeTextColor'])

const { color, textColor } = $(toRefs(props))

function handleClick() {
    emit('update:active', color)
    emit('update:activeTextColor', textColor)
}
</script>
