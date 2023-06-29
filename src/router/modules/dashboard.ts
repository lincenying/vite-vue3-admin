import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'
import Layout from '@/layout/index.vue'

const route: Route[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: { title: 'Dashboard', icon: 'sfont system-home' },
        children: [
            {
                path: 'dashboard',
                component: createNameComponent(() => import('@/views/main/dashboard/index.vue')),
                meta: { title: '首页', icon: 'sfont system-home', hideClose: true },
            },
        ],
    },
]

export default route
