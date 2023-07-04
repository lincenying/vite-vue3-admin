import path from 'node:path'
import type { ConfigEnv, UserConfigExport } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import { viteMockServe } from '@lincy/vite-plugin-mock'
import UnoCSS from 'unocss/vite'
import { warmup } from 'vite-plugin-warmup'

import Components from './vite.config.components'
import Build from './vite.config.build'
import Css from './vite.config.css'

function pathResolve(dir: string): any {
    return path.resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
    '@': pathResolve('src'),
}

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        base: './',
        resolve: {
            alias,
        },
        ...Build,
        ...Css,
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
                enable: command === 'serve' || process.env.VITE_APP_ENV === 'test',
                logger: true,
            }),
            ...Components(),
            UnoCSS({}),
            warmup({
                // warm up the files and its imported JS modules recursively
                clientFiles: ['./src/main.ts', './src/views/**/*.vue'],
            }),
        ],

    }
}
