interface RedFlagsTabProps {
    data: {
        nondisclosure_clause: { mention: boolean; wording: string; look_back_period: string };
        material_facts: { defined: boolean; list: string[]; omission_consequence: string };
        fraud_definitions: { mention: boolean; actions_labeled_as_fraud: string[]; forfeiture_wording: string };
    }
}

const RedFlagsTab = ({ data }: RedFlagsTabProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Non-disclosure */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Non-Disclosure</h3>
                </div>
                <div className="bg-destructive/5 border border-destructive/10 p-8 rounded-4xl flex flex-col gap-6 flex-1 shadow-sm hover:border-destructive/30 transition-colors">
                    <div>
                        <span className="text-[10px] font-bold text-destructive uppercase tracking-widest block mb-2">Look-back Period</span>
                        <div className="text-3xl font-black text-foreground">{data.nondisclosure_clause.look_back_period || "Not Specified"}</div>
                    </div>
                    <div className="h-px bg-destructive/10 w-full" />
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Critical Wording</span>
                        <div className="bg-background/50 p-4 rounded-xl border border-destructive/5">
                            <p className="text-sm text-foreground italic leading-relaxed font-medium">"{data.nondisclosure_clause.wording}"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Material Facts */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Material Facts</h3>
                </div>
                <div className="bg-card border border-border p-8 rounded-4xl flex flex-col gap-6 flex-1 shadow-sm group hover:border-primary/20 transition-colors">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">What counts as "Material"</span>
                        <ul className="m-0 p-0 list-none flex flex-col gap-3">
                            {data.material_facts.list.map((fact, i) => (
                                <li key={i} className="grid grid-cols-[16px_1fr] gap-3 text-sm text-foreground font-medium group-hover:translate-x-1 transition-transform">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto pt-6 border-t border-border">
                        <span className="text-[10px] font-bold text-destructive uppercase tracking-widest block mb-1">Consequence of Omission</span>
                        <p className="text-sm text-destructive font-bold leading-tight">{data.material_facts.omission_consequence}</p>
                    </div>
                </div>
            </div>

            {/* Fraud Definition */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Fraud Clauses</h3>
                </div>
                <div className="bg-card border border-border p-8 rounded-4xl flex flex-col gap-6 flex-1 shadow-sm">
                    <div className="flex flex-col gap-4 text-sm">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Fraudulent Actions</span>
                        <div className="flex flex-wrap gap-2">
                            {data.fraud_definitions.actions_labeled_as_fraud.map((action, i) => (
                                <span key={i} className="px-3 py-1.5 bg-muted/50 rounded-lg border border-border text-xs font-bold text-foreground">{action}</span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="p-5 bg-destructive/5 border border-destructive/10 rounded-2xl">
                            <span className="text-[10px] font-bold text-destructive uppercase tracking-widest block mb-2">Forfeiture Wording</span>
                            <p className="text-sm text-foreground italic leading-relaxed font-medium">"{data.fraud_definitions.forfeiture_wording}"</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RedFlagsTab;
