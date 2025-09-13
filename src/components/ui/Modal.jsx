import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from './Button'

const Modal = ({
    isOpen,
    onClose,
    children,
    className,
    size = 'md',
    showCloseButton = true
}) => {
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full'
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    className={cn(
                        "relative w-full bg-background rounded-lg shadow-lg",
                        sizes[size],
                        className
                    )}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                >
                    {showCloseButton && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 z-10"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

const ModalHeader = ({ children, className }) => (
    <div className={cn("px-6 py-4 border-b", className)}>
        {children}
    </div>
)

const ModalContent = ({ children, className }) => (
    <div className={cn("px-6 py-4", className)}>
        {children}
    </div>
)

const ModalFooter = ({ children, className }) => (
    <div className={cn("px-6 py-4 border-t bg-muted/10 flex justify-end space-x-2", className)}>
        {children}
    </div>
)

const ModalTitle = ({ children, className }) => (
    <h2 className={cn("text-lg font-semibold", className)}>
        {children}
    </h2>
)

export { Modal, ModalHeader, ModalContent, ModalFooter, ModalTitle }