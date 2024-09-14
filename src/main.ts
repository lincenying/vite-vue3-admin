/*
 * @Date: 2022-05-22 20:44:25
 * @Description:
 */

import { createApp } from 'vue'

import globalPlugin from '~/plugin/global'

import App from './App.vue'
import router from './router'

import 'uno.css'
import 'element-plus/theme-chalk/display.css'
import './assets/style/index.scss'
import './theme/modules/chinese/index.scss'

/** 权限路由处理主方法 */
const app = createApp(App)
setupPinia(app).use(router).use(globalPlugin).mount('#app')

// production mock server
if (import.meta.env.VITE_APP_ENV === 'pre-release') {
    import('./mockProdServer').then(({ setupProdMockServer }) => {
        setupProdMockServer()
    })
}
