import { query } from "../config/database";

export const createReviewService = async (
    submissionId: number, reviewerId: number, action: string, comment: string | null) => {
    const result = await query(
        `INSERT INTO reviews
        (submission_id, reviewer_id, action, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [submissionId, reviewerId, action, comment]
    );
    return result.rows[0];
};


export const updateSubmissionStatusForReview = async (submissionId: number, status: string) => {
    const result = await query(
        `UPDATE submissions
         SET status = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [status, submissionId]
    );
    return result.rows[0] || null;
};


export const getReviewsBySubmissionService = async (
    submissionId: number) => {
    const result = await query(
        `SELECT
            r.id,
            r.submission_id,
            r.reviewer_id,
            r.action,
            r.comment,
            r.created_at,
            u.name AS reviewer_name
         FROM reviews r
         JOIN users u
         ON r.reviewer_id = u.id
         WHERE r.submission_id = $1
         ORDER BY r.created_at DESC`,
        [submissionId]
    );

    return result.rows;
};