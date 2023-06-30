<template>
    <div>
        <el-dialog v-model="show" :title="layer.title" :width="layer.width" center>
            <slot />
            <template v-if="layer.showButton" #footer>
                <div>
                    <el-button type="primary" @click="emit('confirm')">确认</el-button>
                    <el-button @click="show = false">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import type { LayoutDialogProps } from './components.types'

const props = withDefaults(defineProps<LayoutDialogProps>(), {
    layer: () => ({
        show: false,
        title: '',
        showButton: false,
    }),
})

const emit = defineEmits(['confirm', 'update'])

defineOptions({
    name: 'LayoutDialog',
})

const show = ref<boolean>(props.layer.show)

watch(show, () => {
    emit('update', show.value)
})
</script>

<style lang="scss" scoped>

</style>
./components.types
