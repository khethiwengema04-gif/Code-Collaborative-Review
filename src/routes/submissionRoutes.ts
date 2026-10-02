import { Router } from "express";
import {
    createSubmission, getSubmissionById,
    updateSubmissionStatus, deleteSubmission
} from "../controllers/submissionController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createSubmission);
router.get("/:id", protect, getSubmissionById);
router.patch("/:id/status", protect, updateSubmissionStatus);
router.delete("/:id", protect, deleteSubmission);

export default router;