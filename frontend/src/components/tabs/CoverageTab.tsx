import BorderedCard from "../BorderedCard";

interface CoverageTabProps {
    data: {
        desease: {
            mention: boolean;
            cover_all: {
                bool: boolean;
                wording: string;
                condition: string;
            };
            includes_most: boolean;
            exclusion: string[];
            inclusion: string[];
        };
        hospital: {
            mention: boolean;
            cover_all: {
                bool: boolean;
                wording: string;
                condition: string;
            };
            includes_most: boolean;
            includes: string[];
            excludes: string[];
        };
    };
}

const CoverageTab = ({ data }: CoverageTabProps) => {
    const { desease, hospital } = data;

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Disease Section */}
            <BorderedCard>
                <div className="w-full text-left">
                    <section className="bg-card border border-border shadow-sm rounded-3xl overflow-hidden">
                        <div className="p-5 md:p-6 border-b border-border bg-muted/10 flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.18.08l-2.02-.844a2 2 0 01-1.046-1.106l-.53-1.482a2 2 0 00-.817-1.034l-2.29-1.302a2 2 0 00-1.258-.295l-2.417.302" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground">Disease Coverage</h3>
                        </div>

                        <div className="p-5 md:p-8">
                            {!desease.mention ? (
                                <div className="p-8 text-center bg-muted/20 rounded-2xl border border-dashed border-border">
                                    <p className="text-muted-foreground italic">No specific mention of disease coverage in the providing wording.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    {/* Cover All Check */}
                                    <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${desease.cover_all.bool ? 'bg-green-500/5 border-green-500/20' : 'bg-destructive/5 border-destructive/20'}`}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-3 h-3 rounded-full animate-pulse ${desease.cover_all.bool ? 'bg-green-500' : 'bg-destructive'}`} />
                                            <span className={`text-lg md:text-xl font-bold ${desease.cover_all.bool ? 'text-green-500' : 'text-destructive'}`}>
                                                {desease.cover_all.bool ? 'Comprehensive Coverage' : 'Conditional Coverage'}
                                            </span>
                                        </div>
                                        <div className="text-sm font-mono text-left">
                                            {desease.cover_all.bool ? (
                                                <div className="bg-background/80 p-5 rounded-xl border border-green-500/10 shadow-sm">
                                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Supporting Wording</div>
                                                    <p className="text-foreground leading-relaxed">{desease.cover_all.wording}</p>
                                                </div>
                                            ) : (
                                                <div className="bg-background/80 p-5 rounded-xl border border-destructive/10 shadow-sm">
                                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Restrictive Condition</div>
                                                    <p className="text-foreground leading-relaxed">{desease.cover_all.condition}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Partial Coverage Details */}
                                    {!desease.cover_all.bool && (
                                        <div className="animate-in fade-in duration-700">
                                            {desease.includes_most && desease.exclusion.length > 0 && (
                                                <div className="flex flex-col gap-4 text-left">
                                                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Excluded from Coverage</div>
                                                    <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {desease.exclusion.map((item, i) => (
                                                            <li key={i} className="px-5 py-4 bg-muted/30 border border-border rounded-xl text-sm font-bold text-foreground flex items-center gap-3">
                                                                <div className="w-2 h-2 rounded-full bg-destructive/40 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {!desease.includes_most && desease.inclusion.length > 0 && (
                                                <div className="flex flex-col gap-4 text-left">
                                                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explicitly Covered Diseases</div>
                                                    <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {desease.inclusion.map((item, i) => (
                                                            <li key={i} className="px-5 py-4 bg-muted/30 border border-border rounded-xl text-sm font-bold text-foreground flex items-center gap-3">
                                                                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </BorderedCard>

            {/* Hospital Section */}
            <BorderedCard>
                <div className="w-full text-left">
                    <section className="bg-card border border-border shadow-sm rounded-3xl overflow-hidden">
                        <div className="p-5 md:p-6 border-b border-border bg-muted/10 flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground">Hospital Network</h3>
                        </div>

                        <div className="p-6 md:p-8">
                            {!hospital.mention ? (
                                <div className="p-8 text-center bg-muted/20 rounded-2xl border border-dashed border-border">
                                    <p className="text-muted-foreground italic">No specific hospitals mentioned in the wording.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${hospital.cover_all.bool ? 'bg-green-500/5 border-green-500/20' : 'bg-primary/5 border-primary/20'}`}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-3 h-3 rounded-full animate-pulse ${hospital.cover_all.bool ? 'bg-green-500' : 'bg-primary'}`} />
                                            <span className={`text-lg md:text-xl font-bold ${hospital.cover_all.bool ? 'text-green-500' : 'text-primary'}`}>
                                                {hospital.cover_all.bool ? 'Any-Hospital Network' : 'Restricted Hospital Network'}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-left">
                                            {hospital.cover_all.bool ? (
                                                <div className="bg-background/80 p-5 rounded-xl border border-green-500/10 shadow-sm">
                                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Network Scope</div>
                                                    <p className="text-foreground leading-relaxed font-mono">{hospital.cover_all.wording}</p>
                                                </div>
                                            ) : (
                                                <div className="bg-background/80 p-5 rounded-xl border border-primary/10 shadow-sm">
                                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Network Limitations</div>
                                                    <p className="text-foreground leading-relaxed font-mono">{hospital.cover_all.condition}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {!hospital.cover_all.bool && (
                                        <div className="animate-in fade-in duration-700">
                                            {hospital.includes_most && hospital.excludes.length > 0 && (
                                                <div className="flex flex-col gap-4 text-left">
                                                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Excluded Networks</div>
                                                    <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {hospital.excludes.map((item, i) => (
                                                            <li key={i} className="px-5 py-4 bg-muted/30 border border-border rounded-xl text-sm font-bold text-foreground flex items-center gap-3">
                                                                <div className="w-2 h-2 rounded-full bg-destructive/40 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {!hospital.includes_most && hospital.includes.length > 0 && (
                                                <div className="flex flex-col gap-4 text-left">
                                                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Included Networks</div>
                                                    <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {hospital.includes.map((item, i) => (
                                                            <li key={i} className="px-5 py-4 bg-muted/30 border border-border rounded-xl text-sm font-bold text-foreground flex items-center gap-3">
                                                                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </BorderedCard>
        </div>
    );
};

export default CoverageTab;
