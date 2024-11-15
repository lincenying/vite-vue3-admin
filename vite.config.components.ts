import type { PluginOption } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default (): PluginOption[] => ([
    /**
     * 按需自动导入API
     * @see https://github.com/antfu/unplugin-auto-import#readme
     */
    AutoImport({
        eslintrc: {
            enabled: true,
        },
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        imports: [
            'vue',
            'vue-router',
            '@vueuse/core',
            '@vueuse/head',
            {
                '@lincy/utils': ['deepClone', 'deepMerge', 'deepEqual'],
                'pinia': ['defineStore', 'storeToRefs'],
                'vue-router': ['createRouter', 'createWebHashHistory'],
            },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/components', 'src/**/components', 'src/composables', 'src/stores'],

        resolvers: [
            ElementPlusResolver(),
            IconsResolver(),
        ],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    /**
     * 按需自动导入Vue组件
     * @see https://github.com/antfu/unplugin-vue-components#readme
     */
    Components({
        dirs: ['src/components', 'src/**/components'],
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        extensions: ['vue', 'tsx', 'jsx'],
        resolvers: [
            ElementPlusResolver({
                importStyle: 'sass',
            }),
            IconsResolver({
                // 图标库合集别名
                alias: {
                    ad: 'ant-design',
                },
            }),
        ],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
    }),
    /**
     * 按需访问数千个图标作为组件
     * @see https://github.com/antfu/unplugin-icons#readme
     * @example <i-mdi-account-box style="font-size: 2em; color: red"/>
     */
    Icons({
        autoInstall: true,
    }),
])
