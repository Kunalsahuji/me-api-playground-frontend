import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser, logoutUser } from '../store/slices/authSlice'

export const useAuth = () => {
    const dispatch = useDispatch()
    const { user, token, isAuthenticated, loading, error } = useSelector(state => state.auth)

    useEffect(() => {
        if (token && !user) {
            dispatch(getCurrentUser())
        }
    }, [token, user, dispatch])

    const logout = () => {
        dispatch(logoutUser())
    }

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        logout
    }
}