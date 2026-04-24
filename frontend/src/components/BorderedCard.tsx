import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const BorderedCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn("p-5 relative", className)}>
            <div className="absolute w-full border-t border-border top-5 left-0 z-30"></div>
            <div className="absolute w-full border-b border-border bottom-5 left-0 z-30"></div>
            <div className="absolute h-full border-l border-border top-0 left-5 z-30"></div>
            <div className="absolute h-full border-r border-border top-0 right-5 z-30"></div>
            {children}
        </div>
    )
}

export default BorderedCard