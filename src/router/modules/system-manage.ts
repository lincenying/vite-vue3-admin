import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/systemManage',
        redirect: '/systemManage/user',
        level: 1,
        meta: { title: '系统管理', icon: 'sfont system-xitongzhuangtai' },
        alwayShow: true,
    },
    {
        parentPath: '/systemManage',
        path: '/systemManage/user',
        component: createNameComponent(() => import('@/views/system-manage/users.vue')),
        meta: { title: '用户' },
    },
]

export default route
