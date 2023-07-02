import { createProdMockServer } from '@lincy/vite-plugin-mock/client'

import userModule from '../mock/user'
import tableModule from '../mock/table'
import cardModule from '../mock/card'
import workModule from '../mock/work'
import UserMoudle from '../mock/systemUser'

export function setupProdMockServer() {
    createProdMockServer([
        ...userModule,
        ...tableModule,
        ...cardModule,
        ...workModule,
        ...UserMoudle,
    ])
}
