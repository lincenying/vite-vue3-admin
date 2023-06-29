/*
 * @Date: 2022-05-22 20:44:25
 * @Description:
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/dist/index.css'

import 'normalize.css'

// css初始化
import './assets/style/common.scss' // 公共css
import './theme/modules/chinese/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'

/** 权限路由处理主方法 */
const app = createApp(App)
app.use(ElementPlus, { size: 'small' }).use(store).use(router).mount('#app')
