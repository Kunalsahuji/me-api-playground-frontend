import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: 'light',
    sidebarOpen: true,
    activeTab: 'profile',
    modals: {
        profileEdit: false,
        educationAdd: false,
        workAdd: false,
        linksEdit: false,
        projectCreate: false,
        projectEdit: false,
        skillsEdit: false
    },
    notifications: [],
    loading: {
        global: false,
        profile: false,
        projects: false
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        openModal: (state, action) => {
            state.modals[action.payload] = true
        },
        closeModal: (state, action) => {
            state.modals[action.payload] = false
        },
        closeAllModals: (state) => {
            Object.keys(state.modals).forEach(key => {
                state.modals[key] = false
            })
        },
        addNotification: (state, action) => {
            const notification = {
                id: Date.now(),
                ...action.payload,
                timestamp: new Date().toISOString()
            }
            state.notifications.unshift(notification)
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                notif => notif.id !== action.payload
            )
        },
        clearNotifications: (state) => {
            state.notifications = []
        },
        setGlobalLoading: (state, action) => {
            state.loading.global = action.payload
        },
        setProfileLoading: (state, action) => {
            state.loading.profile = action.payload
        },
        setProjectsLoading: (state, action) => {
            state.loading.projects = action.payload
        }
    }
})

export const {
    toggleTheme,
    setTheme,
    toggleSidebar,
    setSidebarOpen,
    setActiveTab,
    openModal,
    closeModal,
    closeAllModals,
    addNotification,
    removeNotification,
    clearNotifications,
    setGlobalLoading,
    setProfileLoading,
    setProjectsLoading
} = uiSlice.actions

export default uiSlice.reducer