import type { Route } from '../index.type'

import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/table',
        redirect: '/table/crudTable',
        meta: { title: '表格页面', icon: 'iconfont icon-yemianpeizhi' },
        children: [
            {
                path: '/table/crudTable',
                component: createNameComponent(() => import('@/views/table/crud-table.vue')),
                meta: { title: '业务表格', icon: 'iconfont icon-yemian', cache: true, roles: ['admin', 'editor'] },
                children: [],
            },
            {
                path: '/table/categoryTable',
                component: createNameComponent(() => import('@/views/table/category-table.vue')),
                meta: { title: '分类联动表格', icon: 'iconfont icon-yemian', cache: true, roles: ['admin'] },
                children: [],
            },
            {
                path: '/table/treeTable',
                component: createNameComponent(() => import('@/views/table/tree-table.vue')),
                meta: { title: '树联动表格', icon: 'iconfont icon-yemian', cache: true },
                children: [],
            },
            {
                path: '/table/card',
                component: createNameComponent(() => import('@/views/table/card.vue')),
                meta: { title: '卡片列表', icon: 'iconfont icon-yemian', cache: true },
                children: [],
            },
        ],
        alwayShow: true,
    },
]

export default route
