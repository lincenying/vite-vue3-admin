<template>
    <div class="global-table-item" :class="active ? 'active' : ''">
        <router-link v-if="menu.meta.title" :to="menu.path">
            {{ menu.meta.title }}
        </router-link>
        <el-icon v-if="active" @click.stop="emit('reload')"><i-ep-refresh-right /></el-icon>
        <el-icon v-if="!menu.meta.hideClose" alt="删除" @click.stop="emit('close')"><i-ep-close /></el-icon>
    </div>
</template>

<script lang="ts" setup>
import type { MenuItemProps } from '../layout.types'

const props = defineProps<MenuItemProps>()

const emit = defineEmits(['close', 'reload'])

defineOptions({
    name: 'TabsItem',
})

const { menu, active } = $(toRefs(props))
</script>
