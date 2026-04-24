import BorderedCard from "../BorderedCard";

interface WaitingPeriodTabProps {
    data: {
        mention: boolean;
        max_duration: string;
        unscoped: Array<{ benifit_exclusion: string; has_list: boolean; list: string[] }>;
        scoped: boolean;
        scope: Array<{ benifit_exclusion: string; has_list: boolean; list: string[]; duration: string }>;
    }
}

const WaitingPeriodTab = ({ data }: WaitingPeriodTabProps) => {
    if (!data.mention) {
        return (
            <div className="p-8 md:p-12 text-center bg-muted/20 rounded-3xl md:rounded-4xl border border-dashed border-border m-4 md:m-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-muted-foreground font-medium italic">No waiting period information found in this policy.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Max Duration Banner */}
            <BorderedCard>
                <div className="bg-primary/5 border border-primary/10 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-center relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Standard Cooling-off Period</span>
                    <div className="text-4xl md:text-6xl font-black text-foreground drop-shadow-sm group-hover:scale-105 transition-transform duration-500">{data.max_duration}</div>
                    <div className="h-1 w-12 bg-primary/20 rounded-full mt-2" />
                    <p className="text-muted-foreground text-sm font-medium max-w-sm mt-2 leading-relaxed">This is the general waiting period before most benefits become active under this policy.</p>
                </div>
            </BorderedCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Unscoped (General Exclusions) */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-destructive rounded-full" />
                        <h3 className="text-xl font-bold text-foreground">Initial Exclusions</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        {data.unscoped.map((item, i) => (
                            <BorderedCard key={i}>
                                <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-destructive/30 transition-colors text-left">
                                    <div className="text-foreground font-bold text-lg mb-4">{item.benifit_exclusion}</div>
                                    {item.has_list && item.list.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.list.map((li, j) => (
                                                <span key={j} className="px-3 py-1 bg-destructive/10 text-destructive border border-destructive/10 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                    {li}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </BorderedCard>
                        ))}
                    </div>
                </section>

                {/* Scoped (Special Waiting Periods) */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-500 rounded-full" />
                        <h3 className="text-xl font-bold text-foreground">Special Conditions</h3>
                    </div>
                    {!data.scoped ? (
                        <BorderedCard>
                            <div className="bg-muted/30 border border-border p-8 md:p-12 rounded-2xl md:rounded-3xl text-center italic text-muted-foreground font-medium">
                                No special waiting periods for specific conditions detected.
                            </div>
                        </BorderedCard>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {data.scope.map((item, i) => (
                                <BorderedCard key={i}>
                                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-green-500/30 transition-colors group text-left">
                                        <div className="flex justify-between items-start gap-4 mb-4">
                                            <div className="text-foreground font-bold text-lg leading-tight">{item.benifit_exclusion}</div>
                                            <div className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-sm font-black whitespace-nowrap shadow-sm group-hover:scale-110 transition-transform">
                                                {item.duration}
                                            </div>
                                        </div>
                                        {item.has_list && item.list.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.list.map((li, j) => (
                                                    <span key={j} className="px-3 py-1 bg-muted/50 text-foreground border border-border rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                        {li}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </BorderedCard>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default WaitingPeriodTab;
