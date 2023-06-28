import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'
import Layout from '@/layout/index.vue'

const route: Route[] = [
    {
        path: '/pages',
        component: Layout,
        redirect: '/pages/crudTable',
        meta: { title: 'message.menu.page.name', icon: 'sfont system-page' },
        alwayShow: true,
        children: [
            {
                path: 'crudTable',
                component: createNameComponent(() => import('@/views/main/pages/crudTable/index.vue')),
                meta: { title: 'message.menu.page.crudTable', cache: false, roles: ['admin', 'editor'] },
            },
            {
                path: 'categoryTable',
                component: createNameComponent(() => import('@/views/main/pages/categoryTable/index.vue')),
                meta: { title: 'message.menu.page.categoryTable', cache: true, roles: ['admin'] },
            },
            {
                path: 'treeTable',
                component: createNameComponent(() => import('@/views/main/pages/treeTable/index.vue')),
                meta: { title: 'message.menu.page.treeTable', cache: true },
            },
            {
                path: 'card',
                component: createNameComponent(() => import('@/views/main/pages/card/index.vue')),
                meta: { title: 'message.menu.page.card', cache: true },
            },
        ],
    },
]

export default route
