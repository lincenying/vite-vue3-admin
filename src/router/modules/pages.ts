import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/pages',
        redirect: '/pages/crudTable',
        level: 1,
        meta: { title: '页面', icon: 'sfont system-page' },
        alwayShow: true,
    },
    {
        parentPath: '/pages',
        path: '/pages/crudTable',
        component: createNameComponent(() => import('@/views/pages/crud-table.vue')),
        meta: { title: '业务表格', cache: false, roles: ['admin', 'editor'] },
    },
    {
        parentPath: '/pages',
        path: '/pages/categoryTable',
        component: createNameComponent(() => import('@/views/pages/category-table.vue')),
        meta: { title: '分类联动表格', cache: true, roles: ['admin'] },
    },
    {
        parentPath: '/pages',
        path: '/pages/treeTable',
        component: createNameComponent(() => import('@/views/pages/tree-table.vue')),
        meta: { title: '树联动表格', cache: true },
    },
    {
        parentPath: '/pages',
        path: '/pages/card',
        component: createNameComponent(() => import('@/views/pages/card.vue')),
        meta: { title: '卡片列表', cache: true },
    },
]

export default route
