import { Router } from "express";
import { register, login } from "../controllers/authController";
import { authorize } from "../middleware/authorize";

const router = Router();

// Sprint 2 Endpoint Allocations
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
