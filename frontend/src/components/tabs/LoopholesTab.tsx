import BorderedCard from "../BorderedCard";

interface LoopholesTabProps {
    data: {
        user_rejection_triggers: Array<{ activity: string; wording: string; is_discretionary: boolean }>;
        exploitable_ambiguities: Array<{ term: string; potential_exploitation: string; vague_wording: string }>;
        silent_exclusions: { mention: boolean; list: string[] };
        technical_traps: {
            notice_period_trap: { exists: boolean; wording: string };
            geographic_limitations: { exists: boolean; restricted_areas: string[]; wording: string };
        };
    }
}

const LoopholesTab = ({ data }: LoopholesTabProps) => {
    return (
        <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Rejection Triggers */}
            <BorderedCard>
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive shadow-sm">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">Rejection Triggers</h3>
                            <p className="text-sm text-muted-foreground">Specific user activities that may lead to claim denial</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.user_rejection_triggers.map((trigger, i) => (
                            <div key={i} className="bg-destructive/5 border border-destructive/10 p-5 md:p-8 rounded-3xl md:rounded-4xl flex flex-col gap-4 relative overflow-hidden group hover:border-destructive/30 transition-all duration-300">
                                <div className="flex justify-between items-start">
                                    <span className="text-lg md:text-xl font-bold text-foreground group-hover:text-destructive transition-colors">{trigger.activity}</span>
                                    {trigger.is_discretionary && (
                                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase font-black rounded-lg border border-primary/20 tracking-widest">Discretionary</span>
                                    )}
                                </div>
                                <div className="bg-background/50 p-4 rounded-xl border border-destructive/5">
                                    <p className="text-sm text-foreground italic leading-relaxed font-medium">"{trigger.wording}"</p>
                                </div>
                                {/* <div className="absolute -bottom-4 -right-4 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div> */}
                            </div>
                        ))}
                    </div>
                </section>
            </BorderedCard>

            {/* Exploitable Ambiguities */}
            <BorderedCard>
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">Exploitable Ambiguities</h3>
                            <p className="text-sm text-muted-foreground">Vague terms often used by insurers to minimize payouts</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {data.exploitable_ambiguities.map((amb, i) => (
                            <div key={i} className="bg-card border border-border p-5 md:p-8 rounded-3xl md:rounded-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center shadow-sm hover:border-primary/20 transition-all duration-300">
                                <div className="flex flex-col gap-4">
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Grey Area Term</div>
                                    <div className="text-2xl md:text-3xl font-black text-foreground tracking-tight underline decoration-primary/20 decoration-4 underline-offset-8">{amb.term}</div>
                                    <div className="mt-4 p-5 bg-muted/30 rounded-2xl border border-border/50">
                                        <p className="text-sm text-foreground font-semibold italic">"{amb.vague_wording}"</p>
                                    </div>
                                </div>
                                <div className="bg-primary/5 border border-primary/10 p-5 md:p-8 rounded-3xl md:rounded-4xl relative overflow-hidden">
                                    {/* <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13 14h-2l-.5 2h3l-.5-2zm-12 0h2l.5 2h-3l.5-2zm15-11h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z" />
                                    </svg>
                                </div> */}
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-4">Strategic Interpretation</span>
                                    <p className="text-base text-foreground font-medium leading-relaxed relative z-10">{amb.potential_exploitation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </BorderedCard>

            {/* Silent Exclusions & Technical Traps */}
            <BorderedCard>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-card border border-border p-6 md:p-10 rounded-3xl md:rounded-4xl shadow-sm">
                        <h4 className="text-xl font-bold text-foreground mb-8 flex items-center gap-4">
                            <div className="w-2 h-8 bg-destructive rounded-full" />
                            Silent Exclusions
                        </h4>
                        <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                            {data.silent_exclusions.list.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 p-4 bg-muted/20 rounded-2xl border border-border/50 group hover:bg-destructive/5 hover:border-destructive/20 transition-all duration-300">
                                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/60 shrink-0 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm font-bold text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="bg-card border border-border p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-sm hover:border-destructive/30 transition-all duration-300 group">
                            <h4 className="font-black mb-4 text-[10px] uppercase text-muted-foreground tracking-[0.2em] group-hover:text-destructive transition-colors">Notice Period Trap</h4>
                            {data.technical_traps.notice_period_trap.exists ? (
                                <div className="p-5 bg-destructive/5 rounded-2xl border border-destructive/10">
                                    <p className="text-base text-foreground font-bold italic leading-tight">"{data.technical_traps.notice_period_trap.wording}"</p>
                                </div>
                            ) : (
                                <div className="p-4 bg-muted/20 rounded-xl text-center">
                                    <span className="text-sm text-muted-foreground font-bold italic">No restrictive notice traps detected.</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-card border border-border p-6 md:p-8 rounded-3xl md:rounded-4xl flex-1 shadow-sm hover:border-destructive/30 transition-all duration-300 group">
                            <h4 className="font-black mb-4 text-[10px] uppercase text-muted-foreground tracking-[0.2em] group-hover:text-destructive transition-colors">Geographic Limitations</h4>
                            {data.technical_traps.geographic_limitations.exists ? (
                                <div className="flex flex-col gap-6">
                                    <div className="p-5 bg-destructive/5 rounded-2xl border border-destructive/10">
                                        <p className="text-base text-foreground font-bold italic leading-tight">"{data.technical_traps.geographic_limitations.wording}"</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {data.technical_traps.geographic_limitations.restricted_areas.map((area, i) => (
                                            <span key={i} className="px-4 py-1.5 bg-destructive text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md shadow-destructive/20">{area}</span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 bg-muted/20 rounded-xl text-center">
                                    <span className="text-sm text-muted-foreground font-bold italic">Global coverage with no restricted zones.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BorderedCard>
        </div>
    )
}

export default LoopholesTab;
