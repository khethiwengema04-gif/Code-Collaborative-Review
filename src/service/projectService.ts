import { query } from "../config/database";
import { Project } from "../types/user.types";

// Create a project
export const createProjectService = async (
    name: string,
    description: string,
    userId: number
) => {
    const result = await query(
        `INSERT INTO projects
        (name, description, created_by)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [name, description, userId]
    );

    return result.rows[0];
};

export const findAllProject = async (): Promise<Project[]> => {
    const { rows } = await query(
        `SELECT *
         FROM projects ORDER BY created_at DESC`
    );

    return rows;
};

// Get all projects
// export const getProjectsService = async () => {
//     const result = await query(
//         `SELECT p.id,p.name,p.description,p.created_by,u.name AS creator_name
//          FROM projects p
//          JOIN users u
//          ON p.created_by = u.id
//          ORDER BY p.created_at DESC`
//     );

//     return result.rows;
// };


// Check if a project exists
export const findProjectById = async (projectId: number) => {
    const result = await query(
        `SELECT *
         FROM projects
         WHERE id = $1`,
        [projectId]
    );

    return result.rows[0] || null;
};


// Find a user
export const findUserForProject = async (userId: number) => {
    const result = await query(
        `SELECT id, name, email, role
         FROM users
         WHERE id = $1`,
        [userId]
    );

    return result.rows[0] || null;
};


// Add member to project
export const addProjectMemberService = async (
    projectId: number,
    userId: number
) => {
    const result = await query(
        `INSERT INTO project_members
        (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id)
        DO NOTHING
        RETURNING *`,
        [projectId, userId]
    );

    return result.rows[0] || null;
};


// Remove member from project
export const removeProjectMemberService = async (
    projectId: number,
    userId: number
) => {
    const result = await query(
        `DELETE FROM project_members
         WHERE project_id = $1
         AND user_id = $2
         RETURNING *`,
        [projectId, userId]
    );

    return result.rows[0] || null;
};