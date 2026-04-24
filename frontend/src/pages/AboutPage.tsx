import BorderedCard from "../components/BorderedCard";
import { Code2, Palette, Shield, Zap, Cpu } from "lucide-react";

const developers = [
    {
        name: "Chetan Walkoli",
        role: "AI Engineer, Frontend Engineer",
        description: "Specializes in integrating LLMs and building high-performance frontend architectures.",
        icon: Cpu,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        name: "Sujal Toke",
        role: "Creative Director, Backend Engineer",
        description: "Focuses on scalable backend systems and maintaining the aesthetic vision of the project.",
        icon: Palette,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        name: "Tushar Ramgirkar",
        role: "UI/UX Engineer, System Design",
        description: "Expert in user experience design and crafting robust system architectures.",
        icon: Shield,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    }
];

const AboutPage = () => {
    return (
        <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">
            {/* About Termix */}
            <section className="flex flex-col gap-6 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-center">
                    <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                        Our Mission
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Demystifying Insurance with AI
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Termix is an advanced AI-powered platform designed to break down complex insurance policies into simple, understandable terms. We believe everyone deserves to know exactly what they're signing up for without needing a legal degree.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
                            <Zap className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">Instant Analysis</h3>
                        <p className="text-sm text-muted-foreground">Upload and get insights in seconds.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
                            <Shield className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">Privacy First</h3>
                        <p className="text-sm text-muted-foreground">Your data is processed securely.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
                            <Code2 className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">Transparent</h3>
                        <p className="text-sm text-muted-foreground">No hidden fees or agendas.</p>
                    </div>
                </div>
            </section>

            {/* About Developers */}
            <section className="flex flex-col gap-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet the Team</h2>
                    <p className="text-muted-foreground text-lg">The visionaries behind Termix.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {developers.map((dev, index) => (
                        <div key={dev.name} className={`animate-in fade-in slide-in-from-bottom-4 duration-700 delay-${(index + 1) * 100}`}>
                            <BorderedCard>
                                <div className="p-8 flex flex-col gap-5 h-full">
                                    <div className={`w-14 h-14 rounded-2xl ${dev.bg} flex items-center justify-center border border-border/50`}>
                                        <dev.icon className={`w-7 h-7 ${dev.color}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold">{dev.name}</h3>
                                        <p className="text-sm text-primary font-bold tracking-wide uppercase">{dev.role}</p>
                                    </div>
                                    <p className="text-base text-muted-foreground leading-relaxed flex-1">
                                        {dev.description}
                                    </p>
                                </div>
                            </BorderedCard>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
