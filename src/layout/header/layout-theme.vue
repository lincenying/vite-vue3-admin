<template>
    <div title="系统设置" @click="handleDrawerChange(true)">
        <i class="iconfont icon-shezhi cursor-pointer" />
    </div>
    <el-drawer v-model="drawer" class="layout-theme" title="系统设置" size="300px" :show-close="false" direction="rtl">
        <h3>整体风格设置</h3>
        <div class="theme-box">
            <themeIcon
                v-for="(row, index) in style"
                :key="index"
                v-model:active="state.style"
                :name="`${index}`"
                :tip="row.name"
                :logo="row.logo.background"
                :menu="row.menu.background"
                :header="row.header.background"
                :main="row.container.background"
                :active-color="row.page.color"
            />
        </div>
        <h3>主题色</h3>
        <div class="theme-box">
            <themeColor
                v-for="(item, key) in themeColorArr"
                :key="key"
                v-model:active="state.primaryColor"
                v-model:active-text-color="state.primaryTextColor"
                :color="item.color"
                :text-color="item.textColor"
                :tip="item.tip"
            />
        </div>
        <h3>其他设置</h3>
        <div class="other-setting">
            <div v-for="option in options" :key="option.name" class="list-item">
                <span>{{ option.name }}</span>
                <el-switch v-model="option.value" active-color="#13ce66" inactive-color="#ff4949" @change="onChange(option)" />
            </div>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import type { ThemeState } from '~/stores/store.types'
import type { Colors } from '~/theme/theme.types'
import type { SettingOption } from '~/types'

import themeColor from '~/layout/header/theme-color.vue'
import themeIcon from '~/layout/header/theme-icon.vue'
import { style } from '~/theme/index'

defineOptions({
    name: 'LayoutTheme',
})

const globalStore = useGlobalStore()

const { showLogo, showTabs, expandOneMenu, theme } = $(storeToRefs(globalStore))
// 只取值，不做computed
const state: ThemeState = reactive(theme.state)

const themeColorArr = [
    { color: '#409eff', textColor: '#fff', tip: '默认蓝' },
    { color: '#d60f20', textColor: '#fff', tip: '玫瑰红' },
    { color: '#ac25e6', textColor: '#fff', tip: '优雅紫' },
    { color: '#4dc86f', textColor: '#fff', tip: '故事绿' },
    { color: '#13c2c2', textColor: '#fff', tip: '明青' },
    { color: '#333', textColor: '#fff', tip: '极客黑' },
]
function setTheme() {
    const userTheme = style[state.style]
    const body = document.getElementsByTagName('body')[0]
    // 设置全局顶部body上的class名称，即为主题名称，便于自定义配置符合当前主题的样式统一入口
    body.setAttribute('data-theme', state.style)
    // 需要设置的颜色参照theme.scss，位置：assets/style/theme.scss
    // 设置主题色
    body.style.setProperty('--system-primary-color', state.primaryColor)
    for (const i in userTheme) {
        if (i === 'name') {
            continue
        }

        const item: any = userTheme[i as keyof Colors]
        for (const y in item) {
            const cssVarName = `--system-${i}-${y.replace(/([A-Z])/g, '-$1').toLowerCase()}`
            body.style.setProperty(cssVarName, item[y])
        }
    }
}
// 监听数据的变化
watch(state, () => {
    const theme = {
        state: {
            ...state,
        },
    }
    globalStore.$patch({
        theme,
    })
    setTheme()
})
const drawer = ref(false)
const options: SettingOption[] = reactive([
    { name: '是否显示Logo', value: showLogo, store: 'showLogo' },
    { name: '是否显示面包屑导航', value: showTabs, store: 'showTabs' },
    { name: '是否保持一个菜单展开', value: expandOneMenu, store: 'expandOneMenu' },
])
function handleDrawerChange(value: boolean) {
    drawer.value = value
}
function onChange(option: SettingOption) {
    globalStore.$patch({
        [option.store]: option.value,
    })
}
setTheme()
</script>
