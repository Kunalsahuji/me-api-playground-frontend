import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Sun, Moon, LogOut, User, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { toggleSidebar, toggleTheme } from '../../store/slices/uiSlice'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { getInitials } from '../../utils/formatters'

const Header = () => {
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state.ui)
    const { user, logout } = useAuth()

    return (
        <motion.header
            className="h-16 bg-card border-b border-border px-4 flex items-center justify-between sticky top-0 z-40"
            initial={{ y: -64 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">MP</span>
                    </div>
                    <h1 className="text-xl font-bold hidden sm:block">Me-API Playground</h1>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                    >
                        2
                    </Badge>
                </Button>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === 'light' ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </Button>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                    <div className="hidden sm:block">
                        <div className="text-sm font-medium">{user?.name}</div>
                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                    </div>

                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-medium">
                            {getInitials(user?.name)}
                        </span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={logout}
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </motion.header>
    )
}

export default Header