import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FileDropArea from '../components/FileDropArea';
import CoverageTab from '../components/tabs/CoverageTab';
import OverviewTab from '../components/tabs/OverviewTab';
import AmountSharingTab from '../components/tabs/AmountSharingTab';
import WaitingPeriodTab from '../components/tabs/WaitingPeriodTab';
import RedFlagsTab from '../components/tabs/RedFlagsTab';
import LoopholesTab from '../components/tabs/LoopholesTab';
import PreAnalyzedGrid from '../components/PreAnalyzedGrid';
import { useAuth } from '../lib/AuthContext';
import { Save, Check, Loader2 } from 'lucide-react';

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

    const renderTabContent = () => {
        if (!analysisData && activeTab !== 'Overview') {
            return (
                <div className="flex flex-col gap-8 p-8 animate-in fade-in duration-500">
                    <div className="space-y-8 max-w-4xl">
                        <div className="space-y-3">
                            <div className="h-8 bg-muted/40 animate-pulse rounded-xl w-1/3" />
                            <div className="h-4 bg-muted/30 animate-pulse rounded-lg w-full" />
                            <div className="h-4 bg-muted/30 animate-pulse rounded-lg w-5/6" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-48 bg-muted/20 animate-pulse rounded-3xl border border-border/50" />
                            <div className="h-48 bg-muted/20 animate-pulse rounded-3xl border border-border/50" />
                        </div>

                        <div className="space-y-4">
                            <div className="h-6 bg-muted/40 animate-pulse rounded-lg w-1/4" />
                            <div className="space-y-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-12 bg-muted/10 animate-pulse rounded-2xl border border-border/30 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        switch (activeTab) {
            case 'Overview':
                return <OverviewTab data={analysisData?.overview} streamingSummary={streamingSummary} />;
            case 'Coverage':
                return <CoverageTab data={analysisData.coverage} />;
            case 'Amount & Sharing':
                return <AmountSharingTab data={analysisData.amount_sharing} />;
            case 'Waiting Period':
                return <WaitingPeriodTab data={data_wrapper(analysisData.waiting_period)} />;
            case 'Red Flags':
                return <RedFlagsTab data={analysisData.red_flags} />;
            case 'Loopholes':
                return <LoopholesTab data={analysisData.loopholes} />;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col gap-8 text-left max-w-7xl mx-auto w-full flex-1">
            <div className="flex flex-col gap-8">
                <div className="sticky top-23 z-40 bg-background/95 backdrop-blur-sm px-5 pt-5 mt-10">
                    <div className="flex items-center justify-between border-b border-border px-5">
                        <div className="flex gap-1 md:gap-4 overflow-x-auto scrollbar-hide overflow-y-hidden scroll-smooth">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-4 text-sm font-semibold transition-all duration-300 relative whitespace-nowrap 
                                        ${activeTab === tab
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-lg'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-full z-10" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {analysisData && (
                            <div className="flex items-center gap-2 pb-1">
                                {isSaved ? (
                                    <div className="flex items-center gap-1.5 text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full text-xs font-bold">
                                        <Check className="w-3.5 h-3.5" />
                                        SAVED
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleSaveAnalysis}
                                        disabled={isSaving}
                                        className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50"
                                    >
                                        {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                        SAVE ANALYSIS
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className='px-5'>
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Small helper to ensure data integrity for edge cases
const data_wrapper = (data: any) => {
    if (!data) return { mention: false };
    return data;
}

export default Analyze