<template>
    <div ref="dom" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
    setup() {
        const dom: Ref<HTMLElement> = ref(null) as any
        onMounted(() => {
            console.log(dom.value)
            const data = dom.value.getBoundingClientRect()
            console.log(data)
        })
        return {
            dom,
        }
    },
})
</script>

<style lang="scss" scoped>

</style>
