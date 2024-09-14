import type { App } from 'vue'

import element from '~/config/element'

function install(app: App) {
    element(app)
}
export default {
    install,
}
