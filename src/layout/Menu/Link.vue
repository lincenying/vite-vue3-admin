<template>
    <component :is="type" v-bind="linkProps(to)" @click="hideMenu">
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'

const props = defineProps<{
    to: string
}>()

defineOptions({
    name: 'MenuLink',
})

const { to } = $(toRefs(props))

const store = useStore()
const isCollapse = computed(() => store.state.app.isCollapse)
const type = ref('router-link')

function linkProps(to: string) {
    return {
        to,
    }
}
function hideMenu() {
    if (document.body.clientWidth <= 1000 && !isCollapse.value)
        store.commit('app/isCollapseChange', true)
}
</script>

<style lang="">

</style>
