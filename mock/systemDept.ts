import type { MockMethod } from './_mock.types'
import { getRandomNumber } from './_utils'

const rules: MockMethod[] = [
    {
        url: '/mock/system/dept/list',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    list: Array.from({ length: 10 }, (_, index) => ({
                        id: index + 1,
                        name: '@ctitle(4, 7)',
                        desc: '@ctitle(7, 20)',
                        time: '@date(yyyy-MM-dd hh:mm:ss)',
                        children: Array.from({ length: getRandomNumber(0, 3) }, () => ({
                            id: getRandomNumber(100, 300),
                            name: '@ctitle(4, 7)',
                            desc: '@ctitle(7, 20)',
                            time: '@date(yyyy-MM-dd hh:mm:ss)',
                        })),
                    })),
                },
                message: 'success',
            }
        },
    } as MockMethod<any, { page: number, pageSize: number }>,
    {
        url: '/mock/system/dept/add',
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
        url: '/mock/system/dept/update',
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
        url: '/mock/system/dept/del',
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

export default rules
