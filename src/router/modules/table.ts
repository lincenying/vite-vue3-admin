import type { Route } from '../index.type'

import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/table',
        redirect: '/table/crud-table',
        meta: { title: '表格页面', icon: 'iconfont icon-yemianpeizhi' },
        children: [
            {
                path: '/table/crud-table',
                component: createNameComponent(() => import('@/views/table/crud-table/index.vue')),
                meta: { title: '业务表格', icon: 'iconfont icon-yemian', cache: true, roles: ['admin', 'editor'] },
                children: [],
            },
            {
                path: '/table/category-table',
                component: createNameComponent(() => import('@/views/table/category-table/index.vue')),
                meta: { title: '分类联动表格', icon: 'iconfont icon-yemian', cache: true, roles: ['admin'] },
                children: [],
            },
            {
                path: '/table/tree-table',
                component: createNameComponent(() => import('@/views/table/tree-table/index.vue')),
                meta: { title: '树联动表格', icon: 'iconfont icon-yemian', cache: true },
                children: [],
            },
            {
                path: '/table/card-table',
                component: createNameComponent(() => import('@/views/table/card-table/index.vue')),
                meta: { title: '卡片列表', icon: 'iconfont icon-yemian', cache: true },
                children: [],
            },
        ],
        alwayShow: true,
    },
]

export default route
