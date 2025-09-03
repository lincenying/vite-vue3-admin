export interface UserListType {
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

export interface RoleListType {
    id?: string
    name: string
    desc: string
    time?: string
}

export interface DeptListType {
    id?: string
    name: string
    desc: string
    time?: string
    children?: DeptListType[]
}
