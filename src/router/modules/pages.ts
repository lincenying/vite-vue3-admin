import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'
import Layout from '@/layout/index.vue'

const route: Route[] = [
    {
        path: '/pages',
        component: Layout,
        redirect: '/pages/crudTable',
        meta: { title: '页面', icon: 'sfont system-page' },
        alwayShow: true,
        children: [
            {
                path: 'crudTable',
                component: createNameComponent(() => import('@/views/main/pages/crudTable/index.vue')),
                meta: { title: '业务表格', cache: false, roles: ['admin', 'editor'] },
            },
            {
                path: 'categoryTable',
                component: createNameComponent(() => import('@/views/main/pages/categoryTable/index.vue')),
                meta: { title: '分类联动表格', cache: true, roles: ['admin'] },
            },
            {
                path: 'treeTable',
                component: createNameComponent(() => import('@/views/main/pages/treeTable/index.vue')),
                meta: { title: '树联动表格', cache: true },
            },
            {
                path: 'card',
                component: createNameComponent(() => import('@/views/main/pages/card/index.vue')),
                meta: { title: '卡片列表', cache: true },
            },
        ],
    },
]

export default route
