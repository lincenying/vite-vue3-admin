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
import Category from './tree.vue'
import myTable from './my-table.vue'

export default defineComponent({
    name: 'TreeTable',
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
    box-sizing: border-box;
    padding: 15px;
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
