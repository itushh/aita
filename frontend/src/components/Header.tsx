import { Link } from "react-router-dom"

const Header = () => {
    return (

        <header className='flex justify-between items-center p-6 bg-background/80 backdrop-blur-md'>
            <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Termix Logo" className="size-5 invert" />
                <div className="text-xl font-bold tracking-tight text-foreground">Termix</div>
            </Link>
            <nav className='flex gap-6 text-sm font-medium'>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                </Link>
                <Link to="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">
                    Analyze
                </Link>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                </Link>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                </Link>
            </nav>
        </header>
    )
}

export default Header