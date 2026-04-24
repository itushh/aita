import { Schema, model, Document } from "mongoose";

export interface IAnalysis extends Document {
    title: string;
    summary: string;
    analysis: any; // Storing the full JSON object
}

const AnalysisSchema = new Schema<IAnalysis>(
    {
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

export const Analysis = model<IAnalysis>("Analysis", AnalysisSchema);
