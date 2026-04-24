import { Link } from "react-router-dom"
import { useAuth } from "../lib/AuthContext"
import { User, Menu, X } from "lucide-react"
import { useState } from "react"

const Header = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/analyze", label: "Analyze" },
        { to: "/about", label: "About" },
    ];

    return (
        <header className='flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-background/80 backdrop-blur-md z-40'>
            <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2 md:gap-3" onClick={() => setIsMenuOpen(false)}>
                    <img src="/logo.png" alt="Termix Logo" className="size-4 md:size-5 invert" />
                    <div className="text-lg md:text-xl font-bold tracking-tight text-foreground line-clamp-1">Termix</div>
                </Link>

                <nav className='hidden md:flex gap-6 text-sm font-medium'>
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} className="text-muted-foreground hover:text-foreground transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-4">
                    {user ? (
                        <Link
                            to="/account"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 bg-muted/50 hover:bg-muted border border-border px-3 py-1.5 rounded-full transition-all text-sm font-medium"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
                                <User className="w-3 h-3" />
                            </div>
                            <span className="max-w-[80px] md:max-w-20 truncate">{user.name.length > 10 ? user.name.split(" ")[0] : user.name}</span>
                        </Link>
                    ) : (
                        <Link
                            to="/auth"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 bg-muted/50 hover:bg-muted border border-border px-3 py-1.5 rounded-full transition-all text-sm font-medium"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
                                <User className="w-3 h-3" />
                            </div>
                            <span className="max-w-[80px] md:max-w-20 truncate">Login</span>
                        </Link>
                    )}
                </div>

                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-background border border-border rounded-2xl shadow-xl md:hidden animate-in fade-in zoom-in-95 duration-200">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header