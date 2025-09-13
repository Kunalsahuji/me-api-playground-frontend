import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LoadingPage } from '../ui/Loading'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, token } = useAuth()

    if (loading && token) {
        return <LoadingPage message="Authenticating..." />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute