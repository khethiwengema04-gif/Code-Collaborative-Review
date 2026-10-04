import { query } from "../config/database";

export const createCommentService = async (submissionId: number, userId: number, comment: string) => {
    const result = await query(
        `INSERT INTO comments
        (submission_id, user_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [submissionId, userId, comment]);

    return result.rows[0];
};


export const getCommentsBySubmissionService = async (submissionId: number) => {
    const result = await query(
        `SELECT
            c.id,
            c.submission_id,
            c.user_id,
            c.comment,
            c.created_at,
            u.name AS user_name
         FROM comments c
         JOIN users u
         ON c.user_id = u.id
         WHERE c.submission_id = $1
         ORDER BY c.created_at ASC`,
        [submissionId]);

    return result.rows;
};


export const getCommentByIdService = async (commentId: number) => {
    const result = await query(
        `SELECT *
         FROM comments
         WHERE id = $1`,
        [commentId]);
    return result.rows[0] || null;
};


export const updateCommentService = async (commentId: number, comment: string) => {
    const result = await query(
        `UPDATE comments
         SET comment = $1,
         updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [comment, commentId]);

    return result.rows[0] || null;
};


export const deleteCommentService = async (commentId: number) => {
    const result = await query(
        `DELETE FROM comments
         WHERE id = $1
         RETURNING *`,
        [commentId]);

    return result.rows[0] || null;
};