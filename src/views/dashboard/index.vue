<template>
    <div class="box">
        <BasicTemplate />
        <CardIndex />
        <Communication />
    </div>
</template>

<script lang="ts" setup>
import BasicTemplate from './components/basic-template.vue'
import Communication from './components/communication.vue'
import CardIndex from './components/card-index.vue'

defineOptions({
    name: 'DashboardIndex',
})
</script>

<style lang="scss" scoped>
.box {
    padding: 15px;
}
</style>
