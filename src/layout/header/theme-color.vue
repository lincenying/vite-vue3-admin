<template>
    <el-tooltip effect="dark" :content="tip" placement="top">
        <div
            class="theme-color"
            :style="{ 'background-color': color }"
            @click="handleClick"
        >
            <div v-if="active === color" class="active">
                <i class="iconfont icon-chenggong" :style="{ color: textColor }" />
            </div>
        </div>
    </el-tooltip>
</template>

<script lang="ts" setup>
interface Props {
    tip?: string
    color?: string
    textColor?: string
}

defineOptions({
    name: 'ThemeColor',
})

/** 使用 withDefaults 后, 不能直接解构 */
const props = withDefaults(defineProps<Props>(), {
    tip: '默认蓝',
    color: '#2978f9',
    textColor: '#fff',
})

const active = defineModel<string>('active', { required: true })
const activeTextColor = defineModel<string>('active-text-color', { required: true })

const { color, textColor } = $(toRefs(props))

function handleClick() {
    active.value = color
    activeTextColor.value = textColor
}
</script>
