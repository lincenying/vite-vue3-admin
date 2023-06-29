import type { Route } from '../index.type'
import { createNameComponent } from '../createNode'

const route: Route[] = [
    {
        path: '/system',
        redirect: '/404',
        hideMenu: true,
        meta: { title: '系统目录' },
    },
    {
        path: '/404',
        component: createNameComponent(() => import('@/views/system/404.vue')),
        hideMenu: true,
        meta: { title: '404', hideTabs: true },
    },
    {
        path: '/401',
        component: createNameComponent(() => import('@/views/system/401.vue')),
        hideMenu: true,
        meta: { title: '401', hideTabs: true },
    },
    {
        path: '/redirect/:path(.*)',
        component: createNameComponent(() => import('@/views/system/redirect.vue')),
        hideMenu: true,
        meta: { title: '重定向页面', hideTabs: true },
    },
    {
        path: '/login',
        component: createNameComponent(() => import('@/views/system/login.vue')),
        hideMenu: true,
        meta: { title: '登录', hideTabs: true },
    },
    // 找不到路由重定向到首页
    {
        path: '/:pathMatch(.*)',
        redirect: '/',
        hideMenu: true,
        meta: { title: '' },
    },
]

export default route
