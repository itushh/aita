import { Link } from "react-router-dom"
import { useAuth } from "../lib/AuthContext"
import { User } from "lucide-react"

const Header = () => {
    const { user } = useAuth();

    return (
        <header className='flex justify-between items-center px-6 py-4 bg-background/80 backdrop-blur-md z-40'>
            <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Termix Logo" className="size-5 invert" />
                <div className="text-xl font-bold tracking-tight text-foreground">Termix</div>
            </Link>
            <div className="flex items-center gap-8">
                <nav className='hidden md:flex gap-6 text-sm font-medium'>
                    <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <Link to="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">
                        Analyze
                    </Link>
                    <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <Link
                            to="/account"
                            className="flex items-center gap-2 bg-muted/50 hover:bg-muted border border-border px-3 py-1.5 rounded-full transition-all text-sm font-medium"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
                                <User className="w-3 h-3" />
                            </div>
                            <span className="max-w-20 truncate">{user.name.length > 10 ? user.name.split(" ")[0] : user.name}</span>
                        </Link>
                    ) : (
                        <Link
                            to="/auth"
                            className="flex items-center gap-2 bg-muted/50 hover:bg-muted border border-border px-3 py-1.5 rounded-full transition-all text-sm font-medium"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
                                <User className="w-3 h-3" />
                            </div>
                            <span className="max-w-20 truncate">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header