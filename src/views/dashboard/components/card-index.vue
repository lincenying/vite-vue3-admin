<template>
    <div class="card-list">
        <CardRow v-for="row in list" :key="row.id" :row="row" />
    </div>
</template>

<script lang="ts" setup>
import CardRow from './card-row.vue'

export interface CardListType {
    id?: number
    name: string
    data: string
    color: string
    icon: string
}

defineOptions({
    name: 'CardIndex',
})

const list: CardListType[] = [
    { id: 1, name: '访问人数', data: '100000', color: '#4e73df', icon: 'iconfont system-yonghu' },
    { id: 2, name: '最新信息', data: '30', color: '#1cc88a', icon: 'iconfont system-xiaoxi' },
    { id: 3, name: '库存数量', data: '20000', color: '#36b9cc', icon: 'iconfont system-shuliang_mianxing' },
    { id: 4, name: '当月营收', data: '20,000', color: '#f6c23e', icon: 'iconfont system-jindutiaoshouyidaozhang' },
]
</script>

<style lang="scss" scoped>
.card-list {
    width: calc(100% + 20px);
    margin-left: -10px;
    display: flex;
    flex-wrap: wrap;
}
</style>
