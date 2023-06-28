// 提示信息仅在开发环境生效
import type { LocaleMessages, VueMessageType } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import store from '@/store'

const files = import.meta.globEager('./modules/*.ts')

const messages: LocaleMessages<VueMessageType> = {}
Object.keys(files).forEach((c: string) => {
    const module = files[c].default
    const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
    messages[moduleName] = module
})

const lang = store.state.app.lang || navigator.language // 初次进入，采用浏览器当前设置的语言，默认采用中文
const locale = lang.includes('en') ? 'en' : 'zh-cn'

/** 国际化主函数，调用vue-i18n插件生成 */
const i18n = createI18n({
    __VUE_I18N_LEGACY_API__: false,
    __VUE_I18N_FULL_INSTALL__: false,
    legacy: false,
    locale,
    fallbackLocale: 'zh-cn',
    messages,
})

document.getElementsByTagName('html')[0].setAttribute('lang', locale)

export default i18n
