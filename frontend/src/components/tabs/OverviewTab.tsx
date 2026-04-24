import BorderedCard from "../BorderedCard";

interface OverviewTabProps {
    data?: {
        policy_title: { mention: boolean; value: string };
        policy_type: { mention: boolean; value: string };
        parties_involved: { mention: boolean; insurer: string; policyholder: string; beneficiaries_defined: boolean };
        period_of_contract: {
            mention: boolean;
            start_date: string;
            end_date: string;
            tenure: string;
            renewable: { bool: boolean; wording: string; condition: string };
        };
        installments: {
            mention: boolean;
            frequency: string;
            grace_period: string;
            consequence_of_lapse: string;
        };
        ways_to_claim: {
            mention: boolean;
            methods: string[];
            claim_notification_timeline: string;
            documentation_required: string[];
        };
        brief_overview: string;
        critical_summary?: string;
    },
    streamingSummary?: string;
}

const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-muted rounded ${className}`} />
);

const OverviewTab = ({ data, streamingSummary }: OverviewTabProps) => {
    const summary = data?.critical_summary || streamingSummary;

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Streamed Summary */}
            <BorderedCard>
                <div className="p-5 md:p-8 rounded-3xl md:rounded-4xl relative overflow-hidden group bg-card border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Summary</h3>
                    </div>
                    {summary ? (
                        <p className="text-base md:text-lg font-medium text-foreground leading-relaxed relative z-10 transition-all duration-300">
                            {summary}
                            {streamingSummary && !data?.critical_summary && <span className="inline-block w-1.5 h-5 ml-1 bg-primary animate-pulse align-middle" />}
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-[90%]" />
                            <Skeleton className="h-5 w-[85%]" />
                        </div>
                    )}
                </div>
            </BorderedCard>

            {/* Header Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BorderedCard className="md:col-span-2">
                    <div className="h-full bg-muted/30 border border-border p-5 md:p-8 rounded-3xl md:rounded-4xl relative overflow-hidden group">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Executive Brief</h3>
                        {data ? (
                            <p className="text-base md:text-lg font-medium text-foreground leading-relaxed relative z-10">{data.brief_overview}</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        )}
                    </div>
                </BorderedCard>
                <BorderedCard>
                    <div className="h-full bg-muted/30 border border-border p-5 md:p-8 rounded-3xl md:rounded-4xl flex flex-col justify-center gap-6 text-left">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Policy Title</div>
                            {data ? (
                                <div className="text-lg font-bold text-foreground truncate">{data.policy_title.value || "N/A"}</div>
                            ) : (
                                <Skeleton className="h-7 w-3/4 mt-1" />
                            )}
                        </div>
                        <div className="h-px bg-border w-full" />
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Policy Type</div>
                            {data ? (
                                <div className="text-lg font-bold text-foreground">{data.policy_type.value || "N/A"}</div>
                            ) : (
                                <Skeleton className="h-7 w-1/2 mt-1" />
                            )}
                        </div>
                    </div>
                </BorderedCard>
            </div>

            {/* Parties & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BorderedCard>
                    <div className="h-full bg-card border border-border p-6 rounded-2xl shadow-sm text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-foreground">Stakeholders</h4>
                        </div>
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex flex-col justify-between py-2 border-b border-border/50 gap-1 text-left">
                                <span className="text-muted-foreground font-medium">Insurer</span>
                                {data ? (
                                    <span className="text-foreground font-bold">{data.parties_involved.insurer}</span>
                                ) : (
                                    <Skeleton className="h-5 w-3/4" />
                                )}
                            </div>
                            <div className="flex flex-col justify-between py-2 border-b border-border/50 gap-1 text-left">
                                <span className="text-muted-foreground font-medium">Policyholder</span>
                                {data ? (
                                    <span className="text-foreground font-bold">{data.parties_involved.policyholder}</span>
                                ) : (
                                    <Skeleton className="h-5 w-2/3" />
                                )}
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground font-medium">Beneficiaries</span>
                                {data ? (
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${data.parties_involved.beneficiaries_defined ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}`}>
                                        {data.parties_involved.beneficiaries_defined ? "DEFINED" : "UNDEFINED"}
                                    </span>
                                ) : (
                                    <Skeleton className="h-5 w-20" />
                                )}
                            </div>
                        </div>
                    </div>
                </BorderedCard>

                <BorderedCard>
                    <div className="h-full bg-card border border-border p-6 rounded-2xl shadow-sm text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-foreground">Contract Period</h4>
                        </div>
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground font-medium">Validity</span>
                                {data ? (
                                    <span className="text-foreground font-bold">{data.period_of_contract.tenure}</span>
                                ) : (
                                    <Skeleton className="h-5 w-24" />
                                )}
                            </div>
                            <div className="flex flex-col gap-4 p-4 bg-muted/30 rounded-xl">
                                <div className="flex flex-col gap-1 text-left">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Starts</span>
                                    {data ? (
                                        <span className="text-foreground font-bold">{data.period_of_contract.start_date}</span>
                                    ) : (
                                        <Skeleton className="h-5 w-28" />
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 text-left">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Ends</span>
                                    {data ? (
                                        <span className="text-foreground font-bold">{data.period_of_contract.end_date}</span>
                                    ) : (
                                        <Skeleton className="h-5 w-28" />
                                    )}
                                </div>
                            </div>
                            <div className="mt-2 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground font-medium">Renewal</span>
                                    {data ? (
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${data.period_of_contract.renewable.bool ? "text-green-500 bg-green-500/10" : "bg-destructive/10 text-destructive"}`}>
                                            {data.period_of_contract.renewable.bool ? "AVAILABLE" : "RESTRICTED"}
                                        </span>
                                    ) : (
                                        <Skeleton className="h-5 w-20" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </BorderedCard>

                <BorderedCard>
                    <div className="h-full bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-foreground">Payments</h4>
                        </div>
                        <div className="flex flex-col gap-4 text-sm flex-1">
                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                <span className="text-muted-foreground font-medium">Frequency</span>
                                {data ? (
                                    <span className="text-foreground font-bold">{data.installments.frequency}</span>
                                ) : (
                                    <Skeleton className="h-5 w-20" />
                                )}
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                <span className="text-muted-foreground font-medium">Grace Period</span>
                                {data ? (
                                    <span className="text-foreground font-bold">{data.installments.grace_period}</span>
                                ) : (
                                    <Skeleton className="h-5 w-24" />
                                )}
                            </div>
                            <div className="mt-4 p-4 bg-destructive/5 rounded-xl border border-destructive/10 text-left">
                                <span className="text-[10px] font-bold text-destructive uppercase tracking-widest block mb-1">Warning: Failure to Pay</span>
                                {data ? (
                                    <span className="text-xs text-foreground font-medium leading-relaxed block italic">"{data.installments.consequence_of_lapse}"</span>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="h-3 w-full" />
                                        <Skeleton className="h-3 w-4/5" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </BorderedCard>
            </div>

            {/* Claims Process */}
            <BorderedCard>
                <div className="bg-card border border-border rounded-3xl md:rounded-4xl overflow-hidden shadow-sm text-left">
                    <div className="p-5 md:p-8 border-b border-border bg-muted/10">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Claims & Settlement</h3>
                                <p className="text-sm text-muted-foreground">Standard operating procedures for claim notification and filing</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Notification Window</div>
                                {data ? (
                                    <div className="inline-block p-4 bg-muted/20 border border-border/30 rounded-xl text-primary font-bold text-md hover:border-primary/30 transition-colors">
                                        {data.ways_to_claim.claim_notification_timeline}
                                    </div>
                                ) : (
                                    <Skeleton className="h-14 w-40 rounded-xl" />
                                )}
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Available Methods</div>
                                <div className="flex flex-col gap-2">
                                    {data ? (
                                        data.ways_to_claim.methods.map((m, i) => (
                                            <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border border-border/30 group hover:border-primary/30 transition-colors">
                                                <div className="p-1 rounded-full bg-green-500/10 text-green-500 mt-0.5">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">{m}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <Skeleton className="h-12 w-full rounded-xl" />
                                            <Skeleton className="h-12 w-full rounded-xl" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Required Documentation</div>
                            <ul className="grid grid-cols-1 gap-3 m-0 p-0 list-none">
                                {data ? (
                                    data.ways_to_claim.documentation_required.map((doc, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border border-border/30 group hover:border-primary/30 transition-colors">
                                            <div className="p-1 rounded-full bg-green-500/10 text-green-500 mt-0.5">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">{doc}</span>
                                        </li>
                                    ))
                                ) : (
                                    Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </BorderedCard>
        </div>
    )
}

export default OverviewTab;
