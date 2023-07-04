import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/',
        redirect: '/dashboard',
        level: 1,
        meta: {
            title: '首页',
            icon: 'iconfont icon-shouye',
            hideTabs: true,
        },
        alwayShow: true,
        children: [],
    },
    {
        parentPath: '/',
        path: '/dashboard',
        component: createNameComponent(() => import('@/views/dashboard/index.vue')),
        meta: { title: '仪表盘', icon: 'iconfont icon-dashboard', hideClose: true },
        children: [],
    },
]

export default route
