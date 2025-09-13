import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { projectService } from '../../services/projectService'
import { toast } from 'react-toastify'

// Async thunks
export const fetchProjects = createAsyncThunk(
    'project/fetchProjects',
    async (params, { rejectWithValue }) => {
        try {
            const response = await projectService.getProjects(params)
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchMyProjects = createAsyncThunk(
    'project/fetchMyProjects',
    async (params, { rejectWithValue }) => {
        try {
            const response = await projectService.getMyProjects(params)
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createProject = createAsyncThunk(
    'project/createProject',
    async (projectData, { rejectWithValue }) => {
        try {
            const response = await projectService.createProject(projectData)
            toast.success('Project created successfully!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const updateProject = createAsyncThunk(
    'project/updateProject',
    async ({ id, projectData }, { rejectWithValue }) => {
        try {
            const response = await projectService.updateProject(id, projectData)
            toast.success('Project updated successfully!')
            return response
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (id, { rejectWithValue }) => {
        try {
            await projectService.deleteProject(id)
            toast.success('Project deleted successfully!')
            return { id }
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const searchProjects = createAsyncThunk(
    'project/searchProjects',
    async (params, { rejectWithValue }) => {
        try {
            const response = await projectService.searchProjects(params)
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    projects: [],
    myProjects: [],
    currentProject: null,
    totalPages: 0,
    currentPage: 1,
    total: 0,
    loading: false,
    error: null,
    filters: {
        search: '',
        skills: [],
        owner: '',
        page: 1,
        limit: 10
    },
    searchFilters: {
        skills: [],
        minSkills: 1,
        sortBy: 'createdAt',
        order: 'desc',
        page: 1,
        limit: 10
    }
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        setSearchFilters: (state, action) => {
            state.searchFilters = { ...state.searchFilters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                search: '',
                skills: [],
                owner: '',
                page: 1,
                limit: 10
            }
        },
        setCurrentProject: (state, action) => {
            state.currentProject = action.payload
        },
        clearCurrentProject: (state) => {
            state.currentProject = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload.projects || []
                state.totalPages = action.payload.totalPages || 0
                state.currentPage = action.payload.currentPage || 1
                state.total = action.payload.total || 0
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch my projects
            .addCase(fetchMyProjects.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMyProjects.fulfilled, (state, action) => {
                state.loading = false
                state.myProjects = action.payload.projects || []
                state.totalPages = action.payload.totalPages || 0
                state.currentPage = action.payload.currentPage || 1
                state.total = action.payload.total || 0
            })
            .addCase(fetchMyProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Create project
            .addCase(createProject.pending, (state) => {
                state.loading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false
                state.myProjects.unshift(action.payload.project)
                state.total += 1
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Update project
            .addCase(updateProject.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false
                const updatedProject = action.payload.project

                // Update in myProjects
                const myProjectIndex = state.myProjects.findIndex(p => p._id === updatedProject._id)
                if (myProjectIndex !== -1) {
                    state.myProjects[myProjectIndex] = updatedProject
                }

                // Update in projects
                const projectIndex = state.projects.findIndex(p => p._id === updatedProject._id)
                if (projectIndex !== -1) {
                    state.projects[projectIndex] = updatedProject
                }

                // Update current project
                if (state.currentProject?._id === updatedProject._id) {
                    state.currentProject = updatedProject
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Delete project
            .addCase(deleteProject.fulfilled, (state, action) => {
                const projectId = action.payload.id
                state.myProjects = state.myProjects.filter(p => p._id !== projectId)
                state.projects = state.projects.filter(p => p._id !== projectId)
                state.total = Math.max(0, state.total - 1)

                if (state.currentProject?._id === projectId) {
                    state.currentProject = null
                }
            })

            // Search projects
            .addCase(searchProjects.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(searchProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload.projects || []
                state.totalPages = action.payload.totalPages || 0
                state.currentPage = action.payload.currentPage || 1
                state.total = action.payload.total || 0
            })
            .addCase(searchProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const {
    clearError,
    setFilters,
    setSearchFilters,
    clearFilters,
    setCurrentProject,
    clearCurrentProject
} = projectSlice.actions

export default projectSlice.reducer