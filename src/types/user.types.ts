export type user_role = 'Submitter' | 'Reviewer'

export interface User {
    id: number,
    email: string,
    password: string,
    name: string,
    role: user_role
}

export type new_user = Omit<User, 'id'>

export interface Project {
    id: number,
    title: string,
    description: string,
    user_id: number,
    assigned_member: number
}