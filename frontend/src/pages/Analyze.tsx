import { useState } from 'react';
import FileDropArea from '../components/FileDropArea';
import CoverageTab from '../components/tabs/CoverageTab';
import OverviewTab from '../components/tabs/OverviewTab';
import AmountSharingTab from '../components/tabs/AmountSharingTab';
import WaitingPeriodTab from '../components/tabs/WaitingPeriodTab';
import RedFlagsTab from '../components/tabs/RedFlagsTab';
import LoopholesTab from '../components/tabs/LoopholesTab';

const Analyze = () => {
    const [analysisData, setAnalysisData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string>('Overview');

    if (!analysisData) {
        return (
            <FileDropArea onAnalysisComplete={(data: any) => setAnalysisData(data)} />
        )
    }

    const tabs = ['Overview', 'Coverage', 'Amount & Sharing', 'Waiting Period', 'Red Flags', 'Loopholes'];

    return (
        <div className="p-4 md:p-8 flex flex-col gap-8 text-left max-w-7xl mx-auto w-full flex-1">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-foreground truncate">{analysisData.overview?.policy_title.value || "Analysis Results"}</h1>
                        {/* <p className="text-muted-foreground max-w-2xl">
                            AI-powered deep dive into your policy. Switch between tabs to explore different aspects of the coverage and potential risks.
                        </p> */}
                    </div>
                </div>

                <div className="sticky top-18.25 z-40 bg-background/95 backdrop-blur-sm -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex border-b border-border gap-1 md:gap-4 overflow-x-auto scrollbar-hide overflow-y-hidden scroll-smooth">
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
                </div>

                <div className="mt-2">
                    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden min-h-125">
                        {activeTab === 'Overview' && (
                            <OverviewTab data={analysisData.overview} />
                        )}
                        {activeTab === 'Coverage' && (
                            <CoverageTab data={analysisData.coverage} />
                        )}
                        {activeTab === 'Amount & Sharing' && (
                            <AmountSharingTab data={analysisData.amount_sharing} />
                        )}
                        {activeTab === 'Waiting Period' && (
                            <WaitingPeriodTab data={data_wrapper(analysisData.waiting_period)} />
                        )}
                        {activeTab === 'Red Flags' && (
                            <RedFlagsTab data={analysisData.red_flags} />
                        )}
                        {activeTab === 'Loopholes' && (
                            <LoopholesTab data={analysisData.loopholes} />
                        )}
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