import type { MockMethod } from '@lincy/vite-plugin-mock'
import type { UserListType } from '~/types'

const users: UserListType[] = [{
    name: 'admin',
    nickName: 'admin',
    role: '系统管理员',
    password: '123456',
    isAdmin: '1',
    token: 'admin',
    info: {
        name: '系统管理员',
    },
}, {
    name: 'editor',
    nickName: 'admin',
    role: '系统管理员',
    password: '123456',
    isAdmin: '1',
    token: 'editor',
    info: {
        name: '编辑人员',
    },
}, {
    name: 'test',
    nickName: 'admin',
    role: '系统管理员',
    password: '123456',
    isAdmin: '1',
    token: 'test',
    info: {
        name: '测试人员',
    },
}]
const mockList: MockMethod[] = [
    {
        url: '/mock/user/login',
        method: 'post',
        response: ({ body }) => {
            const user = users.find((user) => {
                return body.name === user.name && body.password === user.password
            })
            if (user) {
                return {
                    code: 200,
                    data: {
                        token: user.token,
                    },
                    message: 'success',
                }
            }
            else {
                return {
                    code: 401,
                    data: null,
                    message: '用户名或密码错误',
                }
            }
        },
    },
    {
        url: '/mock/user/info',
        method: 'post',
        response: ({ body }: any) => {
            const { token } = body
            const info = users.find((user) => {
                return user.token === token
            })?.info
            if (info) {
                return {
                    code: 200,
                    data: {
                        info,
                    },
                    message: 'success',
                }
            }
            else {
                return {
                    code: 403,
                    data: {},
                    message: '无访问权限',
                }
            }
        },
    },
    {
        url: '/mock/user/out',
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
        url: '/mock/user/passwordChange',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {},
                message: 'success',
            }
        },
    },
]

export default mockList
