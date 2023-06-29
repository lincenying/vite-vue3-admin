import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/',
        redirect: '/dashboard',
        level: 1,
        meta: { title: 'Dashboard', icon: 'sfont system-home' },
    },
    {
        parentPath: '/',
        path: '/dashboard',
        component: createNameComponent(() => import('@/views/dashboard/index.vue')),
        meta: { title: '首页', icon: 'sfont system-home', hideClose: true },
    },
]

export default route
