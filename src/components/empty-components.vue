<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'unplugin-vue-macros/macros' assert { type: 'macro' }

interface Props {
    title?: string
}

defineOptions({
    name: 'EmptyComponents',
})

/** 使用 definePropsRefs 后, 可以直接解构 */
const { title } = withDefaults(definePropsRefs<Props>(), {
    title: 'title',
})
</script>
