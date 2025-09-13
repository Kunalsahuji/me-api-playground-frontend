import api from './api'
import { ENDPOINTS } from '../utils/constants'

export const authService = {
    async login(credentials) {
        const response = await api.post(ENDPOINTS.LOGIN, credentials)
        if (response.token) {
            localStorage.setItem('token', response.token)
        }
        return response
    },

    async register(userData) {
        const response = await api.post(ENDPOINTS.REGISTER, userData)
        if (response.token) {
            localStorage.setItem('token', response.token)
        }
        return response
    },

    async logout() {
        try {
            await api.get(ENDPOINTS.LOGOUT)
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            localStorage.removeItem('token')
        }
    },

    async getCurrentUser() {
        const response = await api.get(ENDPOINTS.CURRENT_USER)
        return response
    },

    getToken() {
        return localStorage.getItem('token')
    },

    isAuthenticated() {
        const token = this.getToken()
        if (!token) return false

        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            return payload.exp > Date.now() / 1000
        } catch (error) {
            return false
        }
    }
}