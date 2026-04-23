import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BorderedCard from "../components/BorderedCard";
import {
    User, Mail, Lock, Trash2, LogOut,
    Settings, History, Save, AlertCircle,
    Loader2, FileText
} from "lucide-react";

interface SavedAnalysis {
    _id: string;
    title: string;
    summary: string;
    analysis: any;
    createdAt: string;
}

const AccountPage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
    const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Profile Form States
    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    // Password Form States
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (activeTab === 'history') {
            fetchSavedAnalyses();
        }
    }, [activeTab]);

    const fetchSavedAnalyses = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/saved-analysis`, {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                setSavedAnalyses(data.analyses);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                updateUser(data.user);
                setSuccessMsg("Profile updated successfully!");
            } else {
                setError(data.errors?.join(", ") || "Update failed");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/change-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                setSuccessMsg("Password changed successfully!");
                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setError(data.errors?.join(", ") || "Update failed");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action is permanent and will delete all your saved analyses.")) return;

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/account`, {
                method: "DELETE",
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                logout();
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAnalysis = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Delete this analysis?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/saved-analysis/${id}`, {
                method: "DELETE",
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                setSavedAnalyses(prev => prev.filter(a => a._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className="flex-1 w-full px-10 pt-20 flex flex-col md:flex-row gap-10">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
                <div className="md:fixed md:w-64 flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-3 px-4 py-3 md:w-full rounded-xl transition-all font-medium ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex items-center gap-3 px-4 py-3 md:w-full rounded-xl transition-all font-medium ${activeTab === 'history' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
                    >
                        <History className="w-5 h-5" />
                        Saved Analyses
                    </button>
                </div>

                <div className="md:fixed bottom-2 rounded-xl border border-border md:w-64">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-medium w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
                {(error || successMsg) && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm animate-in zoom-in-95 duration-200 border ${error ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-green-500/10 border-green-500/20 text-green-600'}`}>
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error || successMsg}</p>
                    </div>
                )}

                {activeTab === 'profile' ? (
                    <div className="flex flex-col gap-10">
                        {/* Edit Profile */}
                        <section className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Profile Information</h2>
                                <p className="text-muted-foreground text-sm">Update your account's profile information and email address.</p>
                            </div>

                            <BorderedCard>
                                <form onSubmit={handleUpdateProfile} className="p-6 flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium px-1">Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium px-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        disabled={loading}
                                        className="self-end px-6 py-2.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 text-sm"
                                    >
                                        <Save className="w-4 h-4" />
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                </form>
                            </BorderedCard>
                        </section>

                        {/* Change Password */}
                        <section className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Change Password</h2>
                                <p className="text-muted-foreground text-sm">Ensure your account is using a long, random password to stay secure.</p>
                            </div>

                            <BorderedCard>
                                <form onSubmit={handleChangePassword} className="p-6 flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium px-1">Current Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium px-1">New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="password"
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium px-1">Confirm Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="password"
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        disabled={loading}
                                        className="self-end px-6 py-2.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 text-sm"
                                    >
                                        <Save className="w-4 h-4" />
                                        {loading ? "Updating..." : "Update Password"}
                                    </button>
                                </form>
                            </BorderedCard>
                        </section>

                        {/* Danger Zone */}
                        <section className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-destructive">Danger Zone</h2>
                                <p className="text-muted-foreground text-sm">Once you delete your account, there is no going back. Please be certain.</p>
                            </div>

                            <BorderedCard>
                                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold">Delete Account</h3>
                                        <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
                                    </div>
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={loading}
                                        className="bg-destructive text-destructive-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-all text-sm flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete Account
                                    </button>
                                </div>
                            </BorderedCard>
                        </section>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Saved Analyses</h2>
                            <p className="text-muted-foreground text-sm">Your previously analyzed policy documents.</p>
                        </div>

                        {loading && savedAnalyses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <p className="text-muted-foreground animate-pulse">Loading your history...</p>
                            </div>
                        ) : savedAnalyses.length === 0 ? (
                            <Link to={'/analyze'}>
                                <BorderedCard>
                                    <div
                                        className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-semibold group-hover:text-primary transition-colors">No saved analysis</h3>
                                                <p className="text-xs text-left text-muted-foreground">
                                                    Click to analyze
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </BorderedCard>
                            </Link>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {savedAnalyses.map((item) => (
                                    <div key={item._id} className="group relative">
                                        <BorderedCard>
                                            <div
                                                onClick={() => {
                                                    // Redirect to analyze page with this data
                                                    localStorage.setItem('saved_analysis', JSON.stringify(item));
                                                    navigate('/analyze?source=saved');
                                                }}
                                                className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-all"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                                                        <p className="text-xs text-muted-foreground">
                                                            Analyzed on {new Date(item.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => handleDeleteAnalysis(item._id, e)}
                                                    className="p-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </BorderedCard>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
