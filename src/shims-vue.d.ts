declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<object, object, any>
    export default component
}

export { }

declare module 'vue-router' {
    interface RouteMeta {
        title: string
        breadcrumb?: boolean
        transition?: string
        activeMenu?: string
        label?: string
        hideClose?: boolean
        hideTabs?: boolean
        cache?: boolean
    }
}
