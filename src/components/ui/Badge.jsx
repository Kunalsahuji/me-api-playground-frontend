import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const Badge = ({
    className,
    variant = "default",
    children,
    onClick,
    removable = false,
    onRemove,
    ...props
}) => {
    const variants = {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200"
    }

    return (
        <motion.span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                onClick && "cursor-pointer",
                variants[variant],
                className
            )}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
            {removable && onRemove && (
                <button
                    type="button"
                    className="ml-1 rounded-full hover:bg-black/10 p-0.5"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove()
                    }}
                >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </motion.span>
    )
}

export { Badge }