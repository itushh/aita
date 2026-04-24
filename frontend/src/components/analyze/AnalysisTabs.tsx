import { Save, Check, Loader2, ChevronsUpDownIcon } from 'lucide-react';

interface AnalysisTabsProps {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    analysisData: any;
    isSaved: boolean;
    isSaving: boolean;
    onSave: () => void;
}

const AnalysisTabs = ({
    tabs,
    activeTab,
    setActiveTab,
    analysisData,
    isSaved,
    isSaving,
    onSave
}: AnalysisTabsProps) => {
    return (
        <div className="sticky top-18 z-40 bg-background/95 backdrop-blur-sm px-4 md:px-5 pt-4 md:pt-5 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-border px-0 lg:px-5 pb-2 lg:pb-0 gap-4">
                {/* Mobile Tab Dropdown */}
                <div className='lg:hidden flex justify-between px-5'>
                    <div className="w-fit flex border border-border items-center px-4 rounded-xl gap-2">
                        <select
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="w-full py-3 rounded-xl text-sm font-semibold focus:outline-none appearance-none"
                        >
                            {tabs.map((tab) => (
                                <option key={tab} value={tab} className='bg-card'>{tab}</option>
                            ))}
                        </select>
                        <ChevronsUpDownIcon />
                    </div>

                    {analysisData && (
                        <div className="flex lg:hidden items-center gap-2 pb-1">
                            {isSaved ? (
                                <div className="flex items-center gap-1.5 text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full text-xs font-bold">
                                    <Check className="w-3.5 h-3.5" />
                                    SAVED
                                </div>
                            ) : (
                                <button
                                    onClick={onSave}
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

                {/* Desktop Tab List */}
                <div className="hidden lg:flex gap-4 overflow-x-auto scrollbar-hide overflow-y-hidden scroll-smooth transition-all">
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
                    <div className="hidden lg:flex items-center gap-2 pb-1">
                        {isSaved ? (
                            <div className="flex items-center gap-1.5 text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full text-xs font-bold">
                                <Check className="w-3.5 h-3.5" />
                                SAVED
                            </div>
                        ) : (
                            <button
                                onClick={onSave}
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
    );
};

export default AnalysisTabs;
