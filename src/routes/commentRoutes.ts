import { Router } from "express";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/submissions/:id/comments", protect,);
router.get("/submissions/:id/comments", protect,);
router.patch("/comments/:id", protect,);
router.delete("/comments/:id", protect,);

export default router;