import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FileDropArea from '../components/FileDropArea';
import PreAnalyzedGrid from '../components/PreAnalyzedGrid';
import AnalysisTabs from '../components/analyze/AnalysisTabs';
import AnalysisResults from '../components/analyze/AnalysisResults';
import { useAuth } from '../lib/AuthContext';

const Analyze = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [analysisData, setAnalysisData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string>('Overview');
    const [streamingSummary, setStreamingSummary] = useState<string>("");
    const [view, setView] = useState<'selection' | 'uploading' | 'results'>('selection');
    const [preAnalyzedPolicies, setPreAnalyzedPolicies] = useState<any[]>([]);
    const [isLoadingGrid, setIsLoadingGrid] = useState(true);

    // Save state
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchPreAnalyzed = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/analyze/pre-analyzed`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setPreAnalyzedPolicies(data);
                }
            } catch (error) {
                console.error("Failed to fetch pre-analyzed policies:", error);
            } finally {
                setIsLoadingGrid(false);
            }
        };
        fetchPreAnalyzed();

        // Check if viewing a saved analysis
        if (searchParams.get('source') === 'saved') {
            const savedData = localStorage.getItem('saved_analysis');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                setAnalysisData(parsed.analysis);
                setStreamingSummary(parsed.summary);
                setView('results');
                setIsSaved(true);
                localStorage.removeItem('saved_analysis');
            }
        }
    }, [searchParams]);

    const handleSelectPreAnalyzed = async (id: string) => {
        setView('results');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/analyze/pre-analyzed/${id}`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setAnalysisData(data.analysis);
                setStreamingSummary(data.summary);
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Failed to fetch policy analysis:", error);
            setView('selection');
        }
    };

    const handleSaveAnalysis = async () => {
        if (!user) {
            navigate('/auth');
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/saved-analysis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: analysisData.overview.policy_title.value || "Untitled Policy",
                    summary: streamingSummary,
                    analysis: analysisData
                }),
                credentials: 'include'
            });

            if (response.ok) {
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Failed to save analysis:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (view === 'selection') {
        return (
            <PreAnalyzedGrid
                policies={preAnalyzedPolicies}
                isLoading={isLoadingGrid}
                onSelect={handleSelectPreAnalyzed}
                onUploadClick={() => {
                    if (!user) {
                        navigate('/auth');
                    } else {
                        setView('uploading');
                    }
                }}
            />
        );
    }

    if (view === 'uploading' && !analysisData) {
        return (
            <FileDropArea
                onStarted={() => {
                    setView('results');
                }}
                onSummaryChunk={(chunk) => setStreamingSummary(prev => prev + chunk)}
                onAnalysisComplete={(data: any) => {
                    setAnalysisData(data);
                    setIsSaved(false);
                }}
            />
        )
    }

    const tabs = ['Overview', 'Coverage', 'Amount & Sharing', 'Waiting Period', 'Red Flags', 'Loopholes'];

    return (
        <div className="flex flex-col gap-6 md:gap-8 text-left max-w-7xl mx-auto w-full flex-1">
            <div className="flex flex-col gap-6 md:gap-8">
                <AnalysisTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    analysisData={analysisData}
                    isSaved={isSaved}
                    isSaving={isSaving}
                    onSave={handleSaveAnalysis}
                />

                <div>
                    <div className='px-4 md:px-5 pb-8'>
                        <AnalysisResults
                            activeTab={activeTab}
                            analysisData={analysisData}
                            streamingSummary={streamingSummary}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analyze