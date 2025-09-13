import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User,
    Briefcase,
    Home,
    Search,
    Settings,
    BookOpen,
    Link as LinkIcon,
    Award
} from 'lucide-react'
import { setActiveTab } from '../../store/slices/uiSlice'
import { cn } from '../../utils/cn'

const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'projects', label: 'Projects', icon: Briefcase, path: '/projects' },
    { id: 'search', label: 'Explore', icon: Search, path: '/explore' },
    { id: 'skills', label: 'Skills', icon: Award, path: '/skills' },
    { id: 'education', label: 'Education', icon: BookOpen, path: '/education' },
    { id: 'links', label: 'Links', icon: LinkIcon, path: '/links' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
]

const Sidebar = () => {
    const dispatch = useDispatch()
    const { sidebarOpen, activeTab } = useSelector(state => state.ui)

    const sidebarVariants = {
        open: { x: 0, width: '16rem' },
        closed: { x: '-100%', width: '4rem' }
    }

    return (
        <AnimatePresence>
            <motion.aside
                className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-30"
                initial="closed"
                animate={sidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="p-4 space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.id

                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                onClick={() => dispatch(setActiveTab(item.id))}
                                className={({ isActive: linkActive }) =>
                                    cn(
                                        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                                        (isActive || linkActive)
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )
                                }
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <AnimatePresence>
                                    {sidebarOpen && (
                                        <motion.span
                                            className="text-sm font-medium"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </NavLink>
                        )
                    })}
                </div>

                {/* Quick Stats */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            className="px-4 py-6 border-t border-border"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Stats</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Projects</span>
                                    <span className="font-medium">3</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Skills</span>
                                    <span className="font-medium">13</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Experience</span>
                                    <span className="font-medium">2+ yrs</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.aside>
        </AnimatePresence>
    )
}

export default Sidebar