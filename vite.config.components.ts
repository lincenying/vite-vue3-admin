import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import type { PluginOption } from 'vite'

export default (): PluginOption[] => ([
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
                '@/api': ['$api'],
                '@lincy/utils': ['deepClone', 'deepMerge', 'deepEqual'],
                'pinia': ['defineStore', 'storeToRefs'],
                'vue-router': ['createRouter', 'createWebHashHistory'],
            },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/components', 'src/composables', 'src/pinia', 'src/echarts'],

        resolvers: [ElementPlusResolver(), IconsResolver()],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    Components({
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        extensions: ['vue', 'tsx', 'jsx'],
        resolvers: [ElementPlusResolver(), IconsResolver({
            // 图标库合集别名
            alias: {
                ad: 'ant-design',
            },
        })],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
    }),
    Icons({
        autoInstall: true,
    }),
])
