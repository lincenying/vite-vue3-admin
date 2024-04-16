<template>
    <component :is="type" v-bind="linkProps(to)" @click="hideMenu">
        <slot />
    </component>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'MenuLink',
})

const { to } = defineProps<{
    to: string
}>()

const globalStore = useGlobalStore()
const { isCollapse } = $(storeToRefs(globalStore))

const type = ref('router-link')

function linkProps(payload: string) {
    return {
        to: payload,
    }
}
function hideMenu() {
    if (document.body.clientWidth <= 1000 && !isCollapse) {
        globalStore.$patch({ isCollapse: true })
    }
}
</script>
