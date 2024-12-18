import type { MockMethod } from '@lincy/vite-plugin-mock'

const roles = ['系统管理员', '平台管理员', '数据统计人员', '信息录入人员', '普通人员']
export default [
    {
        url: '/mock/system/user/list',
        method: 'post',
        response: (opt) => {
            const { page, pageSize } = opt.body
            return {
                code: 200,
                data: {
                    [`list|${pageSize}`]: [{
                        'id|+1': (page - 1) * pageSize + 1,
                        'name': '@name',
                        'nickName': '@cname',
                        'status|1': [0, 1],
                        'role|1': roles,
                        'isAdmin|1': [0, 1],
                    }],
                    pager: {
                        page,
                        pageSize,
                        total: 198,
                    },
                },
                message: 'success',
            }
        },
    },
    {
        url: '/mock/system/user/add',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {},
                message: 'success',
            }
        },
    },
    {
        url: '/mock/system/user/update',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {},
                message: 'success',
            }
        },
    },
    {
        url: '/mock/system/user/updateStatus',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {},
                message: 'success',
            }
        },
    },
    {
        url: '/mock/system/user/del',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {},
                message: 'success',
            }
        },
    },
] as MockMethod[]
