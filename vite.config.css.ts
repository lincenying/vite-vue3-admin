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
        },
    },
}

export default config
