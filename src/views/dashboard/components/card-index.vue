<template>
    <div flex="~ flex-wrap justify-between" mx--10px>
        <card-row v-for="row in list" :key="row.id" :row="row" />
    </div>
</template>

<script lang="ts" setup>
import type { IndexCardType } from '~/types'

import cardRow from '~/views/dashboard/components/card-row.vue'

defineOptions({
    name: 'CardIndex',
})

const list = ref<IndexCardType[]>([
    { id: 1, name: '访问人数', data: '100000', color: '#4e73df', icon: 'iconfont icon-fensiguanli' },
    { id: 2, name: '最新信息', data: '30', color: '#1cc88a', icon: 'iconfont icon-xiaoxi' },
    { id: 3, name: '库存数量', data: '20000', color: '#36b9cc', icon: 'iconfont icon-shuliang' },
    { id: 4, name: '当月营收', data: '20,000', color: '#f6c23e', icon: 'iconfont icon-shuliang' },
])
</script>
