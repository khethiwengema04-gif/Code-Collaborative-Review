import { Request, Response } from "express";
import {
    createReviewService, updateSubmissionStatusForReview, getReviewsBySubmissionService
} from "../services/reviewService";
import { query } from "../config/database";



export const approveSubmission = async (req: Request, res: Response) => {
    try {
        const submissionId = Number(req.params.id);
        const { comment } = req.body;

        if (!submissionId) {
            return res.status(400).json({
                message: "Invalid submission ID"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        // Only reviewers can approve submissions
        if (req.user.role !== "Reviewer") {
            return res.status(403).json({
                message: "Only reviewers can approve submissions"
            });
        }

        // Check submission exists
        const submissionResult = await query(
            `SELECT id, status
             FROM submissions
             WHERE id = $1`,
            [submissionId]
        );

        if (submissionResult.rows.length === 0) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        // Update submission status
        const submission =
            await updateSubmissionStatusForReview(
                submissionId,
                "approved"
            );

        // Create review history record
        const review = await createReviewService(
            submissionId,
            req.user.id,
            "approved",
            comment || null
        );

        return res.status(200).json({
            message: "Submission approved successfully",
            submission,
            review
        });

    } catch (error) {
        console.error(
            "Approve submission error:",
            error
        );

        return res.status(500).json({
            message: "Failed to approve submission"
        });
    }
};