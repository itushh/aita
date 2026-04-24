import CoverageTab from '../tabs/CoverageTab';
import OverviewTab from '../tabs/OverviewTab';
import AmountSharingTab from '../tabs/AmountSharingTab';
import WaitingPeriodTab from '../tabs/WaitingPeriodTab';
import RedFlagsTab from '../tabs/RedFlagsTab';
import LoopholesTab from '../tabs/LoopholesTab';

interface AnalysisResultsProps {
    activeTab: string;
    analysisData: any;
    streamingSummary: string;
}

const AnalysisResults = ({ activeTab, analysisData, streamingSummary }: AnalysisResultsProps) => {
    // Small helper to ensure data integrity for edge cases
    const data_wrapper = (data: any) => {
        if (!data) return { mention: false };
        return data;
    }

    if (!analysisData && activeTab !== 'Overview') {
        return (
            <div className="flex flex-col gap-8 p-4 md:p-8 animate-in fade-in duration-500">
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
};

export default AnalysisResults;
