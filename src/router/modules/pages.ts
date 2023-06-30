import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/pages',
        redirect: '/pages/crudTable',
        level: 1,
        meta: { title: '页面', icon: 'iconfont icon-yemianpeizhi' },
        children: [],
        alwayShow: true,
    },
    {
        parentPath: '/pages',
        path: '/pages/crudTable',
        component: createNameComponent(() => import('@/views/pages/crud-table.vue')),
        meta: { title: '业务表格', icon: 'iconfont icon-yemian', cache: true, roles: ['admin', 'editor'] },
        children: [],
    },
    {
        parentPath: '/pages',
        path: '/pages/categoryTable',
        component: createNameComponent(() => import('@/views/pages/category-table.vue')),
        meta: { title: '分类联动表格', icon: 'iconfont icon-yemian', cache: true, roles: ['admin'] },
        children: [],
    },
    {
        parentPath: '/pages',
        path: '/pages/treeTable',
        component: createNameComponent(() => import('@/views/pages/tree-table.vue')),
        meta: { title: '树联动表格', icon: 'iconfont icon-yemian', cache: true },
        children: [],
    },
    {
        parentPath: '/pages',
        path: '/pages/card',
        component: createNameComponent(() => import('@/views/pages/card.vue')),
        meta: { title: '卡片列表', icon: 'iconfont icon-yemian', cache: true },
        children: [],
    },
]

export default route
