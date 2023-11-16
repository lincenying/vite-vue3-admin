import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from '@lincy/vite-plugin-mock'
import UnoCSS from 'unocss/vite'
import { warmup } from 'vite-plugin-warmup'
import Progress from 'vite-plugin-progress'
import Inspect from 'vite-plugin-inspect'

import Macros from './vite.config.macros'
import Components from './vite.config.components'
import Build from './vite.config.build'
import Css from './vite.config.css'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    console.log(`当前编译环境: ${process.env.VITE_APP_ENV}`)

    return {
        base: './',
        server: Build.server,
        build: Build.build,
        css: Css,
        plugins: [
            ...Macros(),
            ...Components(),
            UnoCSS(),
            /**
             * 本地和生产模拟服务
             * @see https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
             */
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve' || process.env.VITE_APP_ENV === 'pre-release',
                logger: true,
            }),
            /**
             * 服务器初始化后立即预热 Vite 的编译缓存
             * @see https://github.com/bluwy/vite-plugin-warmup#readme
             */
            warmup({
                clientFiles: ['./src/main.ts', './src/views/**/*.vue'],
            }),
            /**
             * 打包时展示进度条的插件
             * @see https://github.com/jeddygong/vite-plugin-progress/blob/main/README.zh-CN.md
             */
            Progress(),
            /**
             * 检查Vite插件的中间状态
             * @see https://github.com/antfu/vite-plugin-inspect#readme
             */
            Inspect(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },
    }
})
