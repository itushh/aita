import { useState, useRef } from 'react';
import BorderedCard from './BorderedCard';

interface FileDropAreaProps {
    onAnalysisComplete: (data: any) => void;
    onSummaryChunk: (chunk: string) => void;
    onStarted: () => void;
}

const FileDropArea = ({ onAnalysisComplete, onSummaryChunk, onStarted }: FileDropAreaProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const handleFileUpload = async (file: File) => {
        if (file.type !== 'application/pdf') {
            setError("Please upload a PDF file.");
            return;
        }

        setError(null);
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/analyze`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });


            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to analyze document.");
            }

            if (!response.body) {
                throw new Error("Response body is empty");
            }

            onStarted();

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let partialData = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                partialData += chunk;

                // Process SSE format: data: {...}\n\n
                const lines = partialData.split("\n\n");
                partialData = lines.pop() || ""; // keep the last partial line

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const jsonStr = line.replace("data: ", "").trim();
                        try {
                            const data = JSON.parse(jsonStr);
                            if (data.type === "summary") {
                                onSummaryChunk(data.content);
                            } else if (data.type === "final") {
                                onAnalysisComplete(data.content);
                            } else if (data.type === "error") {
                                setError(data.content);
                            }
                        } catch (e) {
                            console.error("Error parsing SSE chunk", e);
                        }
                    }
                }
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <div className="flex-1 flex flex-col gap-10 w-full py-12 px-12">
            <BorderedCard className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col gap-5 w-full text-center">
                    <div
                        className={`
                        group relative flex-1 border-2 border-dashed rounded-[2.5rem] flex flex-col justify-center items-center gap-8 transition-all duration-500 cursor-pointer p-12
                        ${isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 shadow-xl shadow-black/5'}
                        ${isUploading ? 'opacity-70 pointer-events-none' : ''}
                    `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />

                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 ${isDragging ? 'bg-primary text-primary-foreground rotate-6' : 'bg-primary/20 text-primary group-hover:scale-110 group-hover:-rotate-3'}`}>
                            {isUploading ? (
                                <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="text-3xl font-bold text-foreground">
                                {isUploading ? 'Analyzing your policy...' : 'Drop your policy here'}
                            </div>
                            <div className="text-muted-foreground text-lg">
                                or click to browse from your computer
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="px-4 py-2 rounded-xl bg-background/50 border border-border text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                PDF ONLY
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-background/50 border border-border text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                MAX 10MB
                            </div>
                        </div>

                        {error && (
                            <div className="absolute bottom-12 px-6 py-3 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20 font-bold animate-in fade-in slide-in-from-bottom-2">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </BorderedCard>

            <div className="text-sm text-muted-foreground/60 flex items-center gap-2 justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your privacy matters. Documents are processed securely and never stored.
            </div>
        </div>
    )
}

export default FileDropArea;