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
import type { IndexCardType } from '~/types'

defineOptions({
    name: 'CardRow',
})

const { row } = defineProps<{
    row: IndexCardType
}>()
</script>
