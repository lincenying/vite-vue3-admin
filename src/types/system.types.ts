export interface IUserList {
    id?: string
    name: string
    password?: string
    nickName: string
    role: string
    isAdmin: number | string
    status?: number | string
    token?: string
    info?: {
        name: string
    }
    loading?: boolean
}

export interface IRoleList {
    id?: string
    name: string
    desc: string
    time?: string
}

export interface IDeptList {
    id?: string
    name: string
    desc: string
    time?: string
    children?: IDeptList[]
}
