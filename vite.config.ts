import path from 'node:path'
import type { ConfigEnv, UserConfigExport } from 'vite'

import { viteMockServe } from '@lincy/vite-plugin-mock'
import UnoCSS from 'unocss/vite'
import { warmup } from 'vite-plugin-warmup'

import Macros from './vite.config.macros'
import Components from './vite.config.components'
import Build from './vite.config.build'
import Css from './vite.config.css'

function pathResolve(dir: string): string {
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
            ...Macros(),
            ...Components(),
            UnoCSS({}),
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve' || process.env.VITE_APP_ENV === 'test',
                logger: true,
            }),
            warmup({
                clientFiles: ['./src/main.ts', './src/views/**/*.vue'],
            }),
        ],
    }
}
