<template>
    <component :is="type" v-bind="linkProps(to)" @click="hideMenu">
        <slot />
    </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'AppLink',
    props: {
        to: {
            type: String,
            required: true,
        },
    },
    setup() {
        const store = useStore()
        const isCollapse = computed(() => store.state.app.isCollapse)
        const linkProps = (to: string) => {
            return {
                to,
            }
        }
        const hideMenu = () => {
            if (document.body.clientWidth <= 1000 && !isCollapse.value)
                store.commit('app/isCollapseChange', true)
        }
        return {
            type: 'router-link',
            linkProps,
            hideMenu,
        }
    },
})
</script>

<style lang="">

</style>
