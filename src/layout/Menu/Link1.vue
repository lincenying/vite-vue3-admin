<template>
    <component :is="type" v-bind="linkProps(to)" @click="hideMenu">
        <slot />
    </component>
</template>

<script lang="ts" setup>
const props = defineProps<{
    to: string
}>()

defineOptions({
    name: 'MenuLink',
})

const { to } = $(toRefs(props))

const globalStore = useGlobalStore()
const { isCollapse } = $(storeToRefs(globalStore))

const type = ref('router-link')

function linkProps(to: string) {
    return {
        to,
    }
}
function hideMenu() {
    if (document.body.clientWidth <= 1000 && !isCollapse)
        globalStore.isCollapseChange(true)
}
</script>
