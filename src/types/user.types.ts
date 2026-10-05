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
export interface Submission {
    id: number,
    project_id: number,
    submitted_by: number,
    title: string,
    code: string,
    status: string,
    created_at: Date
}

export interface Comment {
    id: number,
    submission_id: number,
    user_id: number,
    comment_text: string,
    created_at: Date,
    line_number: number
}

