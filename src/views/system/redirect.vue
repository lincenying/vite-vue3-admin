<template>
    <div />
</template>

<script lang="ts" setup>
defineOptions({
    name: 'Redirect',
    inheritAttrs: true,
})

const { currentRoute, replace } = useRouter()
const { params, query } = unref(currentRoute)
const { path } = params
const _path = Array.isArray(path) ? path.join('/') : path
replace({
    path: `/${_path}`,
    query,
})
</script>
