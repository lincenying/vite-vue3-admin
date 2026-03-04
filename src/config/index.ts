/** 是否服务端渲染 */
export const isSSR = import.meta.env.SSR

/** 接口前缀 */
export const getBaseUrl = () => import.meta.env.VITE_BASE_API

/** 静态资源前缀 */
export const getAssetsUrl = () => import.meta.env.VITE_ASSETS_URL
