import { Router } from "express";
import {
    approveSubmission,
    requestChanges,
    getReviewsBySubmission
} from "../controllers/reviewController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.patch("/submissions/:id/approve", protect, approveSubmission);
router.patch("/submissions/:id/request-changes", protect, requestChanges);
router.get("/submissions/:id/reviews", protect, getReviewsBySubmission);

export default router;