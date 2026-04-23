import { Router } from "express";
import { saveAnalysis, getSavedAnalyses, deleteSavedAnalysis } from "../controllers/savedAnalysis.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, saveAnalysis);
router.get("/", protect, getSavedAnalyses);
router.delete("/:id", protect, deleteSavedAnalysis);

export { router as savedAnalysisRouter };
