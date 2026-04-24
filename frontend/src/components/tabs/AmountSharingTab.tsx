import BorderedCard from "../BorderedCard";

interface AmountSharingTabProps {
    data: {
        sum_insured: {
            mention: boolean;
            base_amount: string;
            is_floater: { bool: boolean; wording: string };
        };
        maximum_limits: {
            mention: boolean;
            overall_annual_limit: string;
            lifetime_maximum: { exists: boolean; amount: string };
        };
        scoped_limits: {
            has_sublimits: boolean;
            scope: Array<{ category: string; limit_type: string; limit_value: string; wording: string }>;
        };
        cost_sharing: {
            copayment: { exists: boolean; percentage: string; condition: string };
            deductible: { exists: boolean; amount: string; type: string };
        };
    }
}

const AmountSharingTab = ({ data }: AmountSharingTabProps) => {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Primary Amounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BorderedCard>
                    <div className="bg-green-500/5 border border-green-500/10 p-5 md:p-8 rounded-3xl md:rounded-4xl flex flex-col gap-4 relative overflow-hidden group shadow-sm text-left">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-green-600">Total Sum Insured</h3>
                        <div className="text-3xl md:text-5xl font-black text-foreground drop-shadow-sm">{data.sum_insured.base_amount}</div>
                        <div className="flex items-center gap-3 mt-4">
                            <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tighter shadow-sm ${data.sum_insured.is_floater.bool ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                {data.sum_insured.is_floater.bool ? 'Floater Plan' : 'Individual Plan'}
                            </span>
                            <div className="flex-1 overflow-hidden">
                                <span className="text-xs text-muted-foreground font-medium italic block truncate">"{data.sum_insured.is_floater.wording}"</span>
                            </div>
                        </div>
                    </div>
                </BorderedCard>
                <BorderedCard>
                    <div className="bg-card border border-border p-5 md:p-8 rounded-3xl md:rounded-4xl flex flex-col justify-center gap-6 shadow-sm text-left">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Annual Limit</span>
                                <span className="text-2xl font-bold text-foreground">{data.maximum_limits.overall_annual_limit}</span>
                            </div>
                            <div className="p-3 rounded-2xl bg-muted/50">
                                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        {data.maximum_limits.lifetime_maximum.exists && (
                            <div className="flex items-center gap-4 pt-6 border-t border-border">
                                <div className="flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">Lifetime Maximum</span>
                                    <span className="text-lg font-bold text-foreground">{data.maximum_limits.lifetime_maximum.amount}</span>
                                </div>
                                <div className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-[10px] font-black uppercase tracking-tighter border border-primary/10">PERPETUAL</div>
                            </div>
                        )}
                    </div>
                </BorderedCard>
            </div>

            {/* Cost Sharing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BorderedCard>
                    <div className="w-full text-left">
                        <div className={`h-full p-5 md:p-8 rounded-3xl md:rounded-4xl border-2 transition-all duration-300 ${data.cost_sharing.copayment.exists ? 'bg-destructive/5 border-destructive/20 shadow-sm' : 'bg-card border-border hover:border-muted-foreground/30'}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-2xl ${data.cost_sharing.copayment.exists ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-foreground">Co-payment</h4>
                            </div>
                            {data.cost_sharing.copayment.exists ? (
                                <div className="flex flex-col gap-3">
                                    <div className="text-4xl font-black text-destructive tracking-tighter">{data.cost_sharing.copayment.percentage}</div>
                                    <div className="p-4 bg-background/50 rounded-xl border border-destructive/10">
                                        <p className="text-xs text-foreground font-medium italic leading-relaxed">"{data.cost_sharing.copayment.condition}"</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-muted-foreground text-sm font-medium bg-muted/30 p-4 rounded-xl text-center">No co-payment required.</div>
                            )}
                        </div>
                    </div>
                </BorderedCard>
                <BorderedCard>
                    <div className="w-full text-left">
                        <div className={`h-full p-5 md:p-8 rounded-3xl md:rounded-4xl border-2 transition-all duration-300 ${data.cost_sharing.deductible.exists ? 'bg-destructive/5 border-destructive/20 shadow-sm' : 'bg-card border-border hover:border-muted-foreground/30'}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-2xl ${data.cost_sharing.deductible.exists ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-foreground">Deductible</h4>
                            </div>
                            {data.cost_sharing.deductible.exists ? (
                                <div className="flex flex-col gap-3">
                                    <div className="text-4xl font-black text-destructive tracking-tighter">{data.cost_sharing.deductible.amount}</div>
                                    <span className="text-[10px] font-black uppercase bg-destructive/10 text-destructive px-3 py-1 rounded-full self-start border border-destructive/10 tracking-widest">{data.cost_sharing.deductible.type}</span>
                                </div>
                            ) : (
                                <div className="text-muted-foreground text-sm font-medium bg-muted/30 p-4 rounded-xl text-center">No deductible mentioned.</div>
                            )}
                        </div>
                    </div>
                </BorderedCard>
            </div>

            {/* Sub-limits */}
            <BorderedCard>
                <div className="w-full text-left">
                    <section className="bg-card border border-border rounded-3xl md:rounded-4xl overflow-hidden shadow-sm">
                        <div className="p-6 md:p-8 border-b border-border bg-muted/10 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Specific Limits & Sub-limits</h3>
                            </div>
                            {data.scoped_limits.has_sublimits && (
                                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20 uppercase tracking-widest">{data.scoped_limits.scope.length} CATEGORIES</span>
                            )}
                        </div>
                        <div className="p-6 md:p-8">
                            {!data.scoped_limits.has_sublimits ? (
                                <div className="p-8 text-center bg-muted/20 rounded-2xl border border-dashed border-border group hover:bg-muted/30 transition-colors">
                                    <p className="text-muted-foreground italic font-medium">No specific sub-limits detected in the policy wording.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {data.scoped_limits.scope.map((item, i) => (
                                        <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-muted/10 border border-border rounded-2xl gap-6 hover:bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300">
                                            <div className="flex flex-col flex-1 gap-1 text-left">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-bold text-foreground">{item.category}</span>
                                                    <span className="text-[10px] uppercase font-bold text-primary/70 bg-primary/5 px-2 py-0.5 rounded border border-primary/10 tracking-widest">{item.limit_type}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground italic font-medium pl-4 border-l-2 border-primary/20 transition-all group-hover:border-primary">"{item.wording}"</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 text-right">
                                                <span className="text-2xl font-black text-foreground drop-shadow-sm">{item.limit_value}</span>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity">MAXIMUM CAP</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </BorderedCard>
        </div>
    )
}

export default AmountSharingTab;
