import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/system',
        redirect: '/system/user',
        level: 1,
        meta: { title: '系统管理', icon: 'iconfont icon-xitong' },
        children: [],
        alwayShow: true,
    },
    {
        parentPath: '/system',
        path: '/system/user',
        component: createNameComponent(() => import('@/views/system/users.vue')),
        meta: { title: '用户', icon: 'iconfont icon-yemian' },
        children: [],
    },
]

export default route
