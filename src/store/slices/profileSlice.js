import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { profileService } from '../../services/profileService'
import { toast } from 'react-toastify'

// Async thunks
export const fetchProfiles = createAsyncThunk(
    'profile/fetchProfiles',
    async (params, { rejectWithValue }) => {
        try {
            const response = await profileService.getProfiles(params)
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchCurrentProfile = createAsyncThunk(
    'profile/fetchCurrentProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await profileService.getCurrentProfile()
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await profileService.updateProfile(profileData)
            toast.success('Profile updated successfully!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const updateSkills = createAsyncThunk(
    'profile/updateSkills',
    async (skills, { rejectWithValue }) => {
        try {
            const response = await profileService.updateSkills(skills)
            toast.success('Skills updated successfully!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const addEducation = createAsyncThunk(
    'profile/addEducation',
    async (educationData, { rejectWithValue }) => {
        try {
            const response = await profileService.addEducation(educationData)
            toast.success('Education added successfully!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const addWork = createAsyncThunk(
    'profile/addWork',
    async (workData, { rejectWithValue }) => {
        try {
            const response = await profileService.addWork(workData)
            toast.success('Work experience added successfully!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const updateLinks = createAsyncThunk(
    'profile/updateLinks',
    async (linksData, { rejectWithValue }) => {
        try {
            const response = await profileService.updateLinks(linksData)
            toast.success('Links updated successfully!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    currentProfile: null,
    profiles: [],
    totalPages: 0,
    currentPage: 1,
    total: 0,
    loading: false,
    error: null,
    filters: {
        search: '',
        skills: [],
        page: 1,
        limit: 10
    }
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                search: '',
                skills: [],
                page: 1,
                limit: 10
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch profiles
            .addCase(fetchProfiles.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.loading = false
                state.profiles = action.payload.profiles || []
                state.totalPages = action.payload.totalPages || 0
                state.currentPage = action.payload.currentPage || 1
                state.total = action.payload.total || 0
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch current profile
            .addCase(fetchCurrentProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCurrentProfile.fulfilled, (state, action) => {
                state.loading = false
                state.currentProfile = action.payload.profile
            })
            .addCase(fetchCurrentProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Update profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.currentProfile = action.payload.profile
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Update skills
            .addCase(updateSkills.fulfilled, (state, action) => {
                if (state.currentProfile) {
                    state.currentProfile.skills = action.payload.skills
                }
            })

            // Add education
            .addCase(addEducation.fulfilled, (state, action) => {
                if (state.currentProfile) {
                    state.currentProfile.education = action.payload.education
                }
            })

            // Add work
            .addCase(addWork.fulfilled, (state, action) => {
                if (state.currentProfile) {
                    state.currentProfile.work = action.payload.work
                }
            })

            // Update links
            .addCase(updateLinks.fulfilled, (state, action) => {
                if (state.currentProfile) {
                    state.currentProfile.links = action.payload.links
                }
            })
    }
})

export const { clearError, setFilters, clearFilters } = profileSlice.actions
export default profileSlice.reducer