<template>
    <el-config-provider :size="size">
        <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
        </router-view>
    </el-config-provider>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'

defineOptions({
    name: 'App',
    inheritAttrs: true,
})

const store = useStore()
const size = computed(() => store.state.app.elementSize)
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100vh;
}
</style>
