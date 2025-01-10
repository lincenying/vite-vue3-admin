import type { App } from 'vue'

import { ElLoading as _ElLoading, ElMessage as _ElMessage, ElMessageBox as _ElMessageBox, ElNotification as _ElNotification } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'

function install(app: App) {
    app.use(_ElLoading)
    app.use(_ElMessageBox)
    app.use(_ElMessage)
    app.use(_ElNotification)
    return app
}

export const ElLoading = _ElLoading
export const ElMessage = _ElMessage
export const ElMessageBox = _ElMessageBox
export const ElNotification = _ElNotification

export default install
