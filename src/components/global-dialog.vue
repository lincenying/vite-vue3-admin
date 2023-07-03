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
import type { GlobalDialogLayer } from './components.types'

const props = defineProps<{
    layer: GlobalDialogLayer<Obj>
}>()

const emit = defineEmits(['confirm', 'update'])

defineOptions({
    name: 'GlobalDialog',
})

const show = ref<boolean>(props.layer.show)

watch(show, () => {
    emit('update', show.value)
})
</script>
