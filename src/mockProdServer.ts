import { createProdMockServer } from 'vite-plugin-mock/client'

import cardModule from '../mock/card'
import systemDept from '../mock/systemDept'
import systemRole from '../mock/systemRole'
import systemUser from '../mock/systemUser'
import tableModule from '../mock/table'
import userModule from '../mock/user'
import workModule from '../mock/work'

export function setupProdMockServer() {
    createProdMockServer([
        ...userModule,
        ...tableModule,
        ...cardModule,
        ...workModule,
        ...systemUser,
        ...systemDept,
        ...systemRole,
    ])
}
