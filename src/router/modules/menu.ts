import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/menu',
        redirect: '/menu/menu-2',
        alwayShow: true,
        level: 1,
        meta: { title: '多级嵌套菜单', icon: 'iconfont system-menu' },
        children: [],
    },
    {
        parentPath: '/menu',
        path: '/menu/menu-1',
        redirect: '/menu/menu-2',
        meta: { title: '二级菜单1' },
        children: [],
    },
    {
        parentPath: '/menu/menu-1',
        path: '/menu/menu-1-1',
        redirect: '/menu/menu-1-1-1',
        meta: { title: '三级菜单_1_1' },
        children: [],
    },
    {
        parentPath: '/menu/menu-1-1',
        path: '/menu/menu-1-1-1',
        component: createNameComponent(() => import('@/views/menu/menu-1/menu-1-1/menu-1-1-1.vue')),
        meta: { title: '四级菜单1_1_1' },
        children: [],
    },
    {
        parentPath: '/menu/menu-1-1',
        path: '/menu/menu-1-1-2',
        component: createNameComponent(() => import('@/views/menu/menu-1/menu-1-1/menu-1-1-2.vue')),
        meta: { title: '四级菜单1_1_2' },
        children: [],
    },
    {
        parentPath: '/menu/menu-1',
        path: '/menu/menu-1-2',
        component: createNameComponent(() => import('@/views/menu/menu-1/menu-1-2.vue')),
        meta: { title: '三级菜单_1_2' },
        children: [],
    },
    {
        parentPath: '/menu',
        path: '/menu/menu-2',
        component: createNameComponent(() => import('@/views/menu/menu-2.vue')),
        meta: { title: '二级菜单2' },
        children: [],
    },
    {
        parentPath: '/menu',
        path: '/menu/menu-3',
        component: createNameComponent(() => import('@/views/menu/menu-3.vue')),
        meta: { title: '二级菜单3' },
        children: [],
    },
]

export default route
