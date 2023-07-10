import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { BuildOptions, ServerOptions } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: {
    server: ServerOptions
    build: BuildOptions
} = {
    server: {
        port: 3001,
        host: '0.0.0.0',
        open: true,
        proxy: { // 代理配置
            '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/mock'),
            },
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
                // manualChunks(id: string) {
                //     if (id.includes('node_modules')) {
                //         if (id.includes('echarts') || id.includes('zrender'))
                //             return 'echarts'
                //         return 'vendor'
                //     }
                // },
            },
        },
    },
}

export default config
