import type { Route } from '../index.type'

import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/system',
        redirect: '/system/user',
        meta: { title: '系统管理', icon: 'iconfont icon-xitong' },
        children: [
            {
                path: '/system/user',
                component: createNameComponent(() => import('@/views/system/users.vue')),
                meta: { title: '用户', icon: 'iconfont icon-yemian' },
                children: [],
            },
        ],
        alwayShow: true,
    },
]

export default route
