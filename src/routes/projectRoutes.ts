import { Router } from "express";
import {
    createProject, addProjectMember, removeProjectMember,
    getAllProjects
} from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";
import { getSubmissionsByProject } from "../controllers/submissionController";

const router = Router();

router.post("/projects", protect, createProject);
router.get("/", protect, getAllProjects);
router.post("projects/:id/members", protect, addProjectMember);
router.delete("/:id/members/:userId", protect, removeProjectMember);
router.get("/:id/submissions", protect, getSubmissionsByProject);

export default router;