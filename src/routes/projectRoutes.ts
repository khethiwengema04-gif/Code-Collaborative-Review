import { Router } from "express";
import {
    createProject, getProjects, addProjectMember, removeProjectMember
} from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";
import { getSubmissionsByProject } from "../controllers/submissionController";

const router = Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.post("/:id/members", protect, addProjectMember);
router.delete("/:id/members/:userId", protect, removeProjectMember);
router.get("/:id/submissions", protect, getSubmissionsByProject);

export default router;