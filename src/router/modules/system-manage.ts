import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'
import LayoutIndex from '@/layout/index.vue'

const route: Route[] = [
    {
        path: '/systemManage',
        component: markRaw(LayoutIndex),
        redirect: '/systemManage/menu',
        meta: { title: '系统管理', icon: 'sfont system-xitongzhuangtai' },
        alwayShow: true,
        children: [
            {
                path: 'user',
                component: createNameComponent(() => import('@/views/system-manage/users.vue')),
                meta: { title: '用户' },
            },
        ],
    },
]

export default route
