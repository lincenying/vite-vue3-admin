<template>
    <div class="dashboard-card-row" :style="{ borderColor: row.color }">
        <div class="card-left">
            <div class="name">{{ row.name }}</div>
            <div class="detail">{{ row.data }}</div>
        </div>
        <div class="card-right">
            <i :class="row.icon" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IndexCardType } from '@/types'

const props = defineProps<{
    row: IndexCardType
}>()

const { row } = $(toRefs(props))

defineOptions({
    name: 'CardRow',
})
</script>
