import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Header from './Header'
import Sidebar from './Sidebar'
import { cn } from '../../utils/cn'

const MainLayout = ({ children }) => {
    const { sidebarOpen } = useSelector(state => state.ui)

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
                <Sidebar />
                <motion.main
                    className={cn(
                        "flex-1 transition-all duration-300 ease-in-out",
                        sidebarOpen ? "ml-64" : "ml-0"
                    )}
                    layout
                >
                    <div className="container py-6">
                        {children}
                    </div>
                </motion.main>
            </div>
        </div>
    )
}

export default MainLayout