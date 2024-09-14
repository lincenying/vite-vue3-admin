import type { App } from 'vue'

import { ElMessage as _ElMessage, ElMessageBox as _ElMessageBox, ElLoading } from 'element-plus'

import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

function install(app: App) {
    app.use(ElLoading)
    app.config.globalProperties.$msgbox = _ElMessageBox
    app.config.globalProperties.$alert = _ElMessageBox.alert
    app.config.globalProperties.$confirm = _ElMessageBox.confirm
    app.config.globalProperties.$prompt = _ElMessageBox.prompt
    app.config.globalProperties.$message = _ElMessage
    return app
}
export default install
export const ElMessage = _ElMessage
export const ElMessageBox = _ElMessageBox
