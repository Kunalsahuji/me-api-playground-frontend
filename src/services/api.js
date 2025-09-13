import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong'

        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }

        return Promise.reject(new Error(message))
    }
)

export default api