import { Schema, model, Document } from "mongoose";

export interface ISavedAnalysis extends Document {
    user: Schema.Types.ObjectId;
    title: string;
    summary: string;
    analysis: any;
}

const SavedAnalysisSchema = new Schema<ISavedAnalysis>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        summary: {
            type: String,
            required: true,
        },
        analysis: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const SavedAnalysis = model<ISavedAnalysis>("SavedAnalysis", SavedAnalysisSchema);
