<template>
    <div class="global-tab-item" :class="active ? 'active' : ''">
        <router-link v-if="menu.meta.title" :to="menu.path">
            {{ menu.meta.title }}
        </router-link>
        <el-icon v-if="active" @click.stop="emit('reload')"><i-ep-refresh-right /></el-icon>
        <el-icon v-if="!menu.meta.hideClose" alt="关闭" @click.stop="emit('close')"><i-ep-close /></el-icon>
    </div>
</template>

<script lang="ts" setup>
import type { TabsType } from '~/composables/storage'

defineOptions({
    name: 'TabsItem',
})

const { menu, active } = defineProps<{
    menu: TabsType
    active: boolean
}>()

const emit = defineEmits(['close', 'reload'])
</script>
