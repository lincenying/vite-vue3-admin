import path from 'node:path'
import type { ConfigEnv, UserConfigExport } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import { viteMockServe } from 'vite-plugin-mock'

import Components from './vite.config.components'

function pathResolve(dir: string): any {
    return path.resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
    '@': pathResolve('src'),
}

export default ({ command }: ConfigEnv): UserConfigExport => {
    const prodMock = true
    return {
        base: './',
        resolve: {
            alias,
        },
        server: {
            port: 3001,
            host: '0.0.0.0',
            open: true,
            proxy: { // 代理配置
                '/dev': 'https://www.fastmock.site/mock/48cab8545e64d93ff9ba66a87ad04f6b/',
            },
        },
        build: {
            target: 'es2018',
            cssTarget: 'chrome79',
            minify: true,
            assetsInlineLimit: 4096,
            chunkSizeWarningLimit: 1000,
            outDir: 'dist',
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'index.html'),
                },
                external: /\.\/assets.*/,
                output: {
                    manualChunks(id: string) {
                        if (id.includes('node_modules')) {
                            if (id.includes('echarts') || id.includes('zrender'))
                                return 'echarts'
                            return 'vendor'
                        }
                    },
                },
            },
        },
        plugins: [
            VueMacros.vite({
                plugins: {
                    vue: vuePlugin({
                        template: {
                            compilerOptions: {
                                isCustomElement: (tag: string) => ['def'].includes(tag),
                            },
                        },
                    }),
                    vueJsx: vueJsx(),
                },
            }),
            viteMockServe({
                mockPath: 'mock',
                localEnabled: command === 'serve',
                prodEnabled: command !== 'serve' && prodMock,
                watchFiles: true,
                injectCode: `
                    import { setupProdMockServer } from '../mockProdServer';
                    setupProdMockServer();
                `,
                logger: true,
            }),
            ...Components(),
        ],
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset')
                                    atRule.remove()
                            },
                        },
                    },
                ],
            },
        },
    }
}
