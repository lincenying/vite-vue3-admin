<template>
    <div class="box">
        <BasicTemplate />
        <Card />
        <Communication />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import basicTemplate from './components/basic-template.vue'
import Communication from './components/communication.vue'
import Card from './components/card/index.vue'

export default defineComponent({
    components: {
        Card,
        BasicTemplate: basicTemplate,
        Communication,
    },
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
</style>
