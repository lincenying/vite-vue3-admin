import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/',
        redirect: '/dashboard',
        level: 1,
        meta: {
            title: '首页',
            icon: 'sfont system-home',
            hideTabs: true,
        },
        alwayShow: true,
        children: [],
    },
    {
        parentPath: '/',
        path: '/dashboard',
        component: createNameComponent(() => import('@/views/dashboard/index.vue')),
        meta: { title: 'Dashboard', icon: 'sfont system-home', hideClose: true },
        children: [],
    },
]

export default route
