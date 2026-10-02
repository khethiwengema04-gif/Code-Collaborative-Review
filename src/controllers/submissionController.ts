import { Request, Response } from "express";
import {
    createSubmissionService,
    getSubmissionsByProjectService,
    getSubmissionByIdService,
    updateSubmissionStatusService,
    deleteSubmissionService
} from "../service/submissionService";


// CREATE SUBMISSION
export const createSubmission = async (req: Request, res: Response) => {

    try {
        const { projectId, title, code } = req.body;
        if (!projectId || !title || !code) {
            return res.status(400).json({ message: "projectId, title and code are required" });
        }

        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const submission = await createSubmissionService(
            Number(projectId), req.user.id, title, code);

        return res.status(201).json({ message: "Submission created successfully", submission });

    } catch (error) {
        console.error("Create submission error:", error);
        return res.status(500).json({ message: "Failed to create submission" });
    }
};


// GET SUBMISSIONS BY PROJECT
export const getSubmissionsByProject = async (
    req: Request, res: Response) => {

    try {
        const projectId = Number(req.params.id);
        if (!projectId) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
        const submissions = await getSubmissionsByProjectService(projectId);
        return res.status(200).json({ submissions });

    } catch (error) {
        console.error("Get project submissions error:", error);
        return res.status(500).json({ message: "Failed to retrieve submissions" });
    }
};


// GET SINGLE SUBMISSION
export const getSubmissionById = async (req: Request, res: Response) => {

    try {
        const submissionId = Number(req.params.id);
        if (!submissionId) {
            return res.status(400).json({ message: "Invalid submission ID" });
        }

        const submission = await getSubmissionByIdService(submissionId);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        return res.status(200).json({ submission });

    } catch (error) {
        console.error("Get submission error:", error);
        return res.status(500).json({ message: "Failed to retrieve submission" });
    }
};


// UPDATE SUBMISSION STATUS
export const updateSubmissionStatus = async (req: Request, res: Response) => {

    try {
        const submissionId = Number(req.params.id);
        const { status } = req.body;
        const validStatuses = ["pending", "in_review", "approved", "changes_requested"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid submission status", allowedStatuses: validStatuses
            });
        }
        const submission = await updateSubmissionStatusService(submissionId, status);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        return res.status(200).json({ message: "Submission status updated successfully", submission });

    } catch (error) {
        console.error("Update submission status error:", error);
        return res.status(500).json({ message: "Failed to update submission status" });
    }
};


// DELETE SUBMISSION
export const deleteSubmission = async (req: Request, res: Response) => {
    try {
        const submissionId = Number(req.params.id);
        if (!submissionId) {
            return res.status(400).json({ message: "Invalid submission ID" });
        }
        const submission = await deleteSubmissionService(submissionId);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        return res.status(200).json({ message: "Submission deleted successfully" });
    } catch (error) {
        console.error("Delete submission error:", error);
        return res.status(500).json({ message: "Failed to delete submission" });
    }
};