import type { App } from 'vue'

import { ElLoading as _ElLoading, ElMessage as _ElMessage, ElMessageBox as _ElMessageBox, ElNotification as _ElNotification } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

function install(app: App) {
    app.use(_ElLoading)
    app.config.globalProperties.$msgbox = _ElMessageBox
    app.config.globalProperties.$alert = _ElMessageBox.alert
    app.config.globalProperties.$confirm = _ElMessageBox.confirm
    app.config.globalProperties.$prompt = _ElMessageBox.prompt
    app.config.globalProperties.$message = _ElMessage
    app.config.globalProperties.$notice = _ElNotification
    return app
}
export default install
export const ElLoading = _ElLoading
export const ElMessage = _ElMessage
export const ElMessageBox = _ElMessageBox
export const ElNotification = _ElNotification
