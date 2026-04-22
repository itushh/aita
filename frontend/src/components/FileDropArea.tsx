import { useState, useRef } from 'react';
/* import Breadcrumb from "./Breadcrumb" */

interface FileDropAreaProps {
    onAnalysisComplete: (data: any) => void;
}

const FileDropArea = ({ onAnalysisComplete }: FileDropAreaProps) => {
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
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to analyze document.");
            }

            const data = await response.json();
            onAnalysisComplete(data);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col gap-5 p-5 md:p-20 w-full text-center">
            {/* <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    Analyze your policy
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Upload your insurance policy in PDF format. Our AI will extract key terms and identify hidden clauses in seconds.
                </p>
            </div> */}

            <div
                className={`
                    group relative flex-1 border-2 border-dashed rounded-4xl flex flex-col justify-center items-center gap-8 transition-all duration-500 cursor-pointer
                    ${isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border bg-muted/30 hover:bg-muted/50 hover:border-muted-foreground/30'}
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

                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 ${isDragging ? 'bg-primary text-primary-foreground rotate-6' : 'bg-background text-primary shadow-xl group-hover:scale-110 group-hover:-rotate-3'}`}>
                    {isUploading ? (
                        <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    )}
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="text-2xl font-semibold text-foreground">
                        {isUploading ? 'Analyzing your policy...' : 'Drop your policy here'}
                    </div>
                    <div className="text-muted-foreground font-medium">
                        or click to browse from your computer
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-background border border-border text-xs font-semibold text-muted-foreground">
                        PDF ONLY
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-background border border-border text-xs font-semibold text-muted-foreground">
                        MAX 10MB
                    </div>
                </div>

                {error && (
                    <div className="absolute bottom-8 px-6 py-3 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20 font-medium animate-in fade-in slide-in-from-bottom-2">
                        {error}
                    </div>
                )}
            </div>

            <div className="text-sm text-muted-foreground/60 flex items-center gap-0 justify-center">
                <div className="p-2 rounded-full hidden md:flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                Your privacy matters. Documents are processed securely and never stored.
            </div>
        </div>
    )
}

export default FileDropArea