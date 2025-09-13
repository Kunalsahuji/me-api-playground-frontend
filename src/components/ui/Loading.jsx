import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const LoadingSpinner = ({ size = "default", className }) => {
    const sizes = {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12"
    }

    return (
        <motion.div
            className={cn(
                "animate-spin rounded-full border-2 border-current border-t-transparent",
                sizes[size],
                className
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    )
}

export const LoadingDots = ({ className }) => {
    return (
        <div className={cn("flex space-x-1", className)}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="h-2 w-2 bg-primary rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                />
            ))}
        </div>
    )
}

export const LoadingCard = () => {
    return (
        <div className="profile-card animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
        </div>
    )
}

export const LoadingPage = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <LoadingSpinner size="xl" />
            <p className="text-muted-foreground">{message}</p>
        </div>
    )
}