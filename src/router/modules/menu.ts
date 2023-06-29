import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'
import LayoutIndex from '@/layout/index.vue'

const route: Route[] = [
    {
        path: '/menu',
        component: markRaw(LayoutIndex),
        redirect: '/menu/menu-1',
        alwayShow: true,
        meta: { title: '多级嵌套菜单', icon: 'sfont system-menu' },
        children: [
            {
                path: 'menu-1',
                component: createNameComponent(() => import('@/components/layout-menu.vue')),
                redirect: '/menu/menu-1/menu-1-1',
                meta: { title: '二级菜单1' },
                children: [
                    {
                        path: 'menu-1-1',
                        component: createNameComponent(() => import('@/components/layout-menu.vue')),
                        redirect: '/menu/menu-1/menu-1-1/menu-1-1-1',
                        meta: { title: '三级菜单1-1' },
                        children: [
                            {
                                path: 'menu-1-1-1',
                                component: createNameComponent(() => import('@/views/menu/menu-1/menu-1-1/menu-1-1-1.vue')),
                                meta: { title: '四级菜单1_1_1' },
                            },
                            {
                                path: 'menu-1-1-2',
                                component: createNameComponent(() => import('@/views/menu/menu-1/menu-1-1/menu-1-1-2.vue')),
                                meta: { title: '四级菜单1_1_2' },
                            },
                        ],
                    },
                    {
                        path: 'menu-1-2',
                        component: createNameComponent(() => import('@/views/menu/menu-1/menu-1-2.vue')),
                        meta: { title: '三级菜单_1_2' },
                    },
                ],
            },
            {
                path: 'menu-2',
                component: createNameComponent(() => import('@/views/menu/menu-2.vue')),
                meta: { title: '二级菜单2' },
            },
            {
                path: 'menu-3',
                component: createNameComponent(() => import('@/views/menu/menu-3.vue')),
                meta: { title: '二级菜单3' },
            },
        ],
    },
]

export default route
