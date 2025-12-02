import type { Route } from '../../types/router.types'

import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/',
        redirect: '/dashboard',
        meta: {
            title: '首页',
            icon: 'iconfont icon-shouye',
            hideTabs: true,
        },
        alwayShow: true,
        children: [
            {
                path: '/dashboard',
                component: createNameComponent(
                    () => import('@/views/dashboard/index.vue'),
                ),
                meta: {
                    title: '仪表盘',
                    icon: 'iconfont icon-dashboard',
                    hideClose: true,
                },
                children: [],
            },
        ],
    },
]

export default route
