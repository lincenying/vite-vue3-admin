import { createProdMockServer } from '@lincy/vite-plugin-mock/client'

import cardModule from '../mock/card'
import UserMoudle from '../mock/systemUser'
import tableModule from '../mock/table'
import userModule from '../mock/user'
import workModule from '../mock/work'

export function setupProdMockServer() {
    createProdMockServer([
        ...userModule,
        ...tableModule,
        ...cardModule,
        ...workModule,
        ...UserMoudle,
    ])
}
