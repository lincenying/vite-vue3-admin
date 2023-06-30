/*
 * @Date: 2022-05-22 20:44:25
 * @Description:
 */
import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import 'element-plus/theme-chalk/display.css'

// 引入基于断点的隐藏类
// css初始化
import './assets/style/common.scss' // 公共css
import './theme/modules/chinese/index.scss'

import App from './App.vue'
import router from './router'
import globalPlugin from '@/plugin/global'

/** 权限路由处理主方法 */
const app = createApp(App)
setupPinia(app).use(router).use(globalPlugin).mount('#app')
