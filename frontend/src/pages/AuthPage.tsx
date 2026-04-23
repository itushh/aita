import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import BorderedCard from "../components/BorderedCard";
import { LayoutPanelTop as LayoutIcon, Mail, Lock, User, Loader2, AlertCircle } from "lucide-react";


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        const body = isLogin
            ? { email: formData.email, password: formData.password }
            : formData;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include'
            });


            const data = await response.json();

            if (data.success) {
                // If login/register is successful, fetch the user data
                const userRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/me`, {
                    credentials: 'include'
                });

                const userData = await userRes.json();

                if (userData.success) {
                    login(userData.user);
                    navigate("/analyze");
                } else {
                    setError("Failed to fetch user data after authentication");
                }
            } else {
                setError(data.errors ? data.errors.join(", ") : "Authentication failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-5">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                <BorderedCard>
                    <div className="p-8 flex flex-col gap-6">
                        <div className="flex flex-col gap-2 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center self-center mb-2">
                                <LayoutIcon className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                {isLogin ? "Welcome back" : "Create an account"}
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                {isLogin
                                    ? "Enter your credentials to access your account"
                                    : "Join us today to start analyzing your policies"}
                            </p>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-xl flex items-center gap-3 text-sm animate-in zoom-in-95 duration-200">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {!isLogin && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium px-1" htmlFor="name">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium px-1" htmlFor="email">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium px-1" htmlFor="password">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-foreground text-background font-semibold py-3 rounded-xl mt-2 hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? "Sign In" : "Create Account")}
                            </button>
                        </form>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                            </span>
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-semibold hover:underline"
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </div>
                </BorderedCard>
            </div>
        </div>
    );
};

export default AuthPage;
