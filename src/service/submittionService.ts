import { query } from "../config/database";


// CREATE SUBMISSION
export const createSubmissionService = async (
    projectId: number, submittedBy: number, title: string, code: string) => {

    const result = await query(
        `INSERT INTO submissions
        (project_id, submitted_by, title, code)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [projectId, submittedBy, title, code]);
    return result.rows[0];
};


// GET SUBMISSIONS FOR A PROJECT
export const getSubmissionsByProjectService = async (projectId: number) => {
    const result = await query(
        `SELECT
            s.id,
            s.project_id,
            s.submitted_by,
            s.title,
            s.code,
            s.status,
            s.created_at,
            u.name AS submitter_name
         FROM submissions s
         JOIN users u
         ON s.submitted_by = u.id
         WHERE s.project_id = $1
         ORDER BY s.created_at DESC`,
        [projectId]);
    return result.rows;
};

// GET ONE SUBMISSION
export const getSubmissionByIdService = async (submissionId: number) => {
    const result = await query(
        `SELECT
            s.id,
            s.project_id,
            s.submitted_by,
            s.title,
            s.code,
            s.status,
            s.created_at,
            u.name AS submitter_name
         FROM submissions s
         JOIN users u
         ON s.submitted_by = u.id
         WHERE s.id = $1`,
        [submissionId]);
    return result.rows[0] || null;
};

// UPDATE SUBMISSION STATUS
export const updateSubmissionStatusService = async (submissionId: number, status: string) => {
    const result = await query(
        `UPDATE submissions
         SET status = $1,
         updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [status, submissionId]);
    return result.rows[0] || null;
};

// DELETE SUBMISSION
export const deleteSubmissionService = async (submissionId: number) => {
    const result = await query(
        `DELETE FROM submissions
         WHERE id = $1
         RETURNING *`,
        [submissionId]);
    return result.rows[0] || null;
};