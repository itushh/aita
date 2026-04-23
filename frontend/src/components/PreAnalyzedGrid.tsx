import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import BorderedCard from './BorderedCard';

interface PreAnalyzedPolicy {
    _id: string;
    title: string;
}

interface PreAnalyzedGridProps {
    policies: PreAnalyzedPolicy[];
    onSelect: (id: string) => void;
    onUploadClick: () => void;
    isLoading: boolean;
}

const PreAnalyzedGrid: React.FC<PreAnalyzedGridProps> = ({ policies, onSelect, onUploadClick, isLoading }) => {

    useEffect(() => {
        console.log(policies)
    }, [policies]);

    return (
        <div className="flex flex-col gap-10 max-w-6xl mx-auto w-full py-12 px-6">
            {/* <div className="flex flex-col gap-4 text-center">
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose from our library or upload your own policy Wordings
                </p>
            </div> */}

            {/* Upload */}
            <div
                onClick={onUploadClick}
                className="flex items-center justify-center gap-4 px-8 py-4 rounded border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all group relative overflow-hidden cursor-pointer w-fit mx-auto"
            >
                {/* <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                <div className="flex items-center justify-center text-foreground/80">
                    <Upload size={18} />
                </div>
                <div className="flex flex-col gap-1 z-10">
                    <span className="font-bold text-foreground/80">Upload Policy Wordings</span>
                    {/* <span className="text-sm text-primary/60">Analyze any PDF policy doc</span> */}
                </div>
            </div>

            <div className='flex gap-5 items-center my-5'>
                <div className='flex-1 h-px bg-border'></div>
                <div className='text-foreground/80'>Library</div>
                <div className='flex-1 h-px bg-border'></div>
            </div>

            {/* Library */}
            {isLoading ?
                <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <BorderedCard>
                                <div
                                    key={i}
                                    className="relative overflow-hidden h-50 rounded-3xl border border-border/50 bg-muted/20"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r rotate-25 scale-200 from-transparent via-white/20 to-transparent animate-shimmer" />
                                </div>
                            </BorderedCard>
                        ))}
                    </div>
                </div>
                :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {policies.map((policy) => (
                        <BorderedCard>
                            <div
                                key={policy._id}
                                onClick={() => onSelect(policy._id)}
                                className="flex flex-col items-start gap-4 p-10 rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 cursor-pointer transition-all text-left shadow-lg shadow-black/5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <FileText size={24} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                        {policy.title}
                                    </span>
                                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-500 uppercase tracking-wider">
                                        <CheckCircle2 size={14} />
                                        Pre-Analyzed
                                    </div>
                                </div>
                            </div>
                        </BorderedCard>
                    ))}
                </div>
            }
        </div>
    );
};

export default PreAnalyzedGrid;
