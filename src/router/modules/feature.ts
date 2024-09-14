import type { Route } from '../index.type'

import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/feature',
        redirect: '/404',
        hideMenu: true,
        meta: { title: '系统目录' },
        children: [],
    },
    {
        path: '/404',
        component: createNameComponent(() => import('@/views/feature/404.vue')),
        hideMenu: true,
        meta: { title: '404', hideTabs: true },
        children: [],
    },
    {
        path: '/401',
        component: createNameComponent(() => import('@/views/feature/401.vue')),
        hideMenu: true,
        meta: { title: '401', hideTabs: true },
        children: [],
    },
    {
        path: '/redirect/:path(.*)',
        component: createNameComponent(() => import('@/views/feature/redirect.vue')),
        hideMenu: true,
        meta: { title: '重定向页面', hideTabs: true },
        children: [],
    },
    {
        path: '/login',
        component: createNameComponent(() => import('@/views/feature/login.vue')),
        hideMenu: true,
        meta: { title: '登录', hideTabs: true },
        children: [],
    },
    // 找不到路由重定向到首页
    {
        path: '/:pathMatch(.*)',
        redirect: '/',
        hideMenu: true,
        meta: { title: '' },
        children: [],
    },
]

export default route
