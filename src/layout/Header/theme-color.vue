<template>
    <el-tooltip class="item" effect="dark" :content="tip" placement="top">
        <div class="theme-color" :style="{ 'background-color': color }" @click="handleClick">
            <div v-if="active === color" class="active">
                <i class="sfont system-success" :style="{ color: textColor }" />
            </div>
        </div>
    </el-tooltip>
</template>

<script lang="ts" setup>
import type { ThemeColorProps } from '../layout.types'

const props = withDefaults(defineProps<ThemeColorProps>(), {
    active: '',
    activeTextColor: '',
    tip: '默认蓝',
    color: '#409eff',
    textColor: '#fff',
})

const emit = defineEmits(['update:active', 'update:activeTextColor'])

defineOptions({
    name: 'ThemeColor',
})

function handleClick() {
    emit('update:active', props.color)
    emit('update:activeTextColor', props.textColor)
}
</script>

<style lang="scss" scoped>
.theme-color {
    border-radius: 4px;
    width: 20px;
    height: 20px;
    display: inline-block;
    cursor: pointer;
    outline: none;
    position: relative;
    .active {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            color: #fff;
            font-weight: bold;
            font-size: 12px;
        }
    }
    & + .theme-color {
        margin-left: 10px;
    }
}
</style>
