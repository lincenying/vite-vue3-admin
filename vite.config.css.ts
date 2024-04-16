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
}

export default config
