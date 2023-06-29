declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

export { }
declare module 'vue-router' {
    interface RouteMeta {
        title: string
        breadcrumb?: boolean
        transition?: string
    }
}
