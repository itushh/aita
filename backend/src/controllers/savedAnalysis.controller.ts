import type { Response } from "express";
import { SavedAnalysis } from "../models/SavedAnalysis.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

/* ========================= Save Analysis Controller ========================= */

export const saveAnalysis = async (req: AuthRequest, res: Response) => {
    try {
        const { title, summary, analysis } = req.body;

        if (!title || !summary || !analysis) {
            return res.status(400).json({
                success: false,
                errors: ["Missing required fields"],
            });
        }

        const savedAnalysis = await SavedAnalysis.create({
            user: req.user._id,
            title,
            summary,
            analysis,
        });

        return res.status(201).json({
            success: true,
            message: "Analysis saved successfully",
            savedAnalysis,
        });
    } catch (error) {
        console.error("Save Analysis Error:", error);
        return res.status(500).json({
            success: false,
            errors: ["Internal Server Error"],
        });
    }
};

/* ========================= Get Saved Analyses Controller ==================== */

export const getSavedAnalyses = async (req: AuthRequest, res: Response) => {
    try {
        const analyses = await SavedAnalysis.find({ user: req.user._id } as any).sort({ createdAt: -1 } as any);


        return res.status(200).json({
            success: true,
            analyses,
        });
    } catch (error) {
        console.error("Get Saved Analyses Error:", error);
        return res.status(500).json({
            success: false,
            errors: ["Internal Server Error"],
        });
    }
};

/* ========================= Delete Saved Analysis Controller ================= */

export const deleteSavedAnalysis = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const analysis = await SavedAnalysis.findOne({ _id: id, user: req.user._id } as any);


        if (!analysis) {
            return res.status(404).json({
                success: false,
                errors: ["Analysis not found"],
            });
        }

        await SavedAnalysis.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Analysis deleted successfully",
        });
    } catch (error) {
        console.error("Delete Saved Analysis Error:", error);
        return res.status(500).json({
            success: false,
            errors: ["Internal Server Error"],
        });
    }
};
