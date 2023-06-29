import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'
import LayoutIndex from '@/layout/index.vue'

const route: Route[] = [
    {
        path: '/',
        component: markRaw(LayoutIndex),
        redirect: '/dashboard',
        meta: { title: 'Dashboard', icon: 'sfont system-home' },
        children: [
            {
                path: 'dashboard',
                component: createNameComponent(() => import('@/views/dashboard/index.vue')),
                meta: { title: '首页', icon: 'sfont system-home', hideClose: true },
            },
        ],
    },
]

export default route
