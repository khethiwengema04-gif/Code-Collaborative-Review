import { Request, Response } from "express";

import {
    createCommentService,
    getCommentsBySubmissionService,
    getCommentByIdService,
    updateCommentService,
    deleteCommentService
} from "../service/commentService";
import { query } from "../config/database";

export const createComment = async (req: Request, res: Response) => {
    try {
        const submissionId = Number(req.params.id);
        const { comment } = req.body;
        if (!submissionId) {
            return res.status(400).json({ message: "Invalid submission ID" });
        }

        if (!comment || comment.trim() === "") {
            return res.status(400).json({ message: "Comment is required" });
        }

        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Submitters are not allowed to comment
        if (req.user.role === "Submitter") {
            return res.status(403).json({ message: "Submitters are not allowed to comment" });
        }

        // Check that submission exists
        const submissionResult = await query(
            `SELECT id
             FROM submissions
             WHERE id = $1`,
            [submissionId]);

        if (submissionResult.rows.length === 0) {
            return res.status(404).json({ message: "Submission not found" });
        }
        const newComment = await createCommentService(submissionId, req.user.id, comment.trim());
        return res.status(201).json({ message: "Comment added successfully", comment: newComment });

    } catch (error) {
        console.error("Create comment error:", error);
        return res.status(500).json({ message: "Failed to add comment" });
    }
};