import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'
import { toast } from 'react-toastify'

// Async thunks
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials)
            toast.success('Login successful!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData)
            toast.success('Registration successful!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.getCurrentUser()
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout()
            toast.success('Logged out successfully!')
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    user: null,
    token: authService.getToken(),
    isAuthenticated: authService.isAuthenticated(),
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        resetAuth: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.profile || action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })

            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.profile || action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })

            // Get current user
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.profile || action.payload.user
                state.isAuthenticated = true
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
                state.token = null
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.isAuthenticated = false
                state.loading = false
                state.error = null
            })
    }
})

export const { clearError, resetAuth } = authSlice.actions
export default authSlice.reducer