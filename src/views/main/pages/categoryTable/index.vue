<template>
    <div class="full">
        <div class="left">
            <Category />
        </div>
        <div class="content">
            <MyTable />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import Category from './category.vue'
import myTable from './my-table.vue'

export default defineComponent({
    name: 'CategoryTable',
    components: {
        Category,
        MyTable: myTable,
    },
    setup() {
        const active: any = ref({})
        provide('active', active)
    },
})
</script>

<style lang="scss" scoped>
  .full {
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    .left {
      width: 250px;
    }
    .content {
      flex: 1;
      width: calc(100% - 250px);
      height: 100%;
    }
  }
</style>
