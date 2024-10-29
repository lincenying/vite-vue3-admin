import type { CSSOptions } from 'vite'

const config: CSSOptions = {
    postcss: {
        plugins: [
            {
                postcssPlugin: 'internal:charset-removal',
                AtRule: {
                    charset: (atRule) => {
                        if (atRule.name === 'charset') {
                            atRule.remove()
                        }
                    },
                },
            },
        ],
    },
    preprocessorOptions: {
        scss: {
            api: 'modern-compiler',
            // 忽略scss global-builtin, import 提示3.0将删除的警告
            silenceDeprecations: ['global-builtin', 'import'],
        },
    },
}

export default config
