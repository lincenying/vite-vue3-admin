# Vue3 管理后台项目模板

vue3 管理后台脚手架, 包含技术栈(Vue3 + Element-Plus + Pinia + Vite + TS + Unocss)
本脚手架没有包含权限控制模块, 比较适合一些轻量的管理后台

demo: http://demo-admin.mmxiaowu.com/

## Features

- 💚 [Vue3](https://cn.vuejs.org/) - 易学易用，性能出色，适用场景丰富。
- ⚡️ [Vite](https://cn.vitejs.dev/) - 即时 HMR.
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 即时按需原子 CSS 引擎
- 😃 使用纯 CSS 中任何图标集的图标，由 [UnoCSS](https://github.com/unocss/unocss) 驱动.
- 🔥 `<script setup lang="ts">` 语法.
- 🍍 [通过 Pinia 进行状态管理](https://github.com/vuejs/pinia), 详见 [./stores/use-index-store.ts](./stores/use-index-store.ts).
- 📥 API 自动导入 - 用于 Composition API、VueUse 和自定义可组合项
- 🏎 零配置云功能和部署
- 🦾 当然是 TypeScript.

## IDE

建议使用 [VS Code](https://code.visualstudio.com/) 和 [Volar](https://github.com/vuejs/language-tools) 以获得最佳体验（您可能需要禁用 [Vetur](https://vuejs.github.io/vetur/) 如果你有的话）。

## Variations

- [vite-nuxt3](https://github.com/lincenying/vite-nuxt3) - Nuxt3 + Vite 入门模板
- [vite-uniapp-vue3](https://github.com/lincenying/vite-uniapp-vue3) - Uniapp3 + Vite 入门模板
- [vite-react-mobx-ssr](https://github.com/lincenying/vite-react-mobx-ssr) - React + Mobx + Vite + SSR 入门模板
- [vite-react-mobx](https://github.com/lincenying/vite-react-mobx) - React + Mobx + Vite 入门模板
- [vite-react-redux](https://github.com/lincenying/vite-react-redux) - React + Redux + Vite 入门模板
- [vite-vue3-h5-ssr](https://github.com/lincenying/vite-vue3-h5-ssr) - Vue3 + Vant + Vite + SSR 入门模板
- [vite-vue3-h5](https://github.com/lincenying/vite-vue3-h5) - Vue3 + Vant + Vite 入门模板
- [vite-vue3-admin](https://github.com/lincenying/vite-vue3-admin) - Vue3 + ElementPlus + Vite 管理后台入门模板

## Try it now!

### Online

https://codesandbox.io/p/github/lincenying/vite-vue3-admin/main

### Clone to local

如果您更喜欢使用更干净的 git 历史记录手动执行此操作

```bash
npx degit lincenying/vite-vue3-admin my-vue3-app
cd my-vue3-app
pnpm i # 如果您没有安装 pnpm，请运行：npm install -g pnpm
```

### 开发环境

```bash
pnpm serve
```

### 生产环境

```bash
pnpm build:stag # 预发布环境
pnpm build # 生产环境
```

### 生产环境预览

```bash
pnpm start
```

### Lint 和修复文件

```bash
pnpm lint # eslint检测不修复
pnpm lint:fix # eslint检测并修复
pnpm lint:ts # ts 类型检测
pnpm lint:css # css 检测并修复

```

## License

[MIT]
