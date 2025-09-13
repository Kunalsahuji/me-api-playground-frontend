import api from './api'
import { ENDPOINTS } from '../utils/constants'

export const projectService = {
    async getProjects(params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const url = `${ENDPOINTS.PROJECTS}${queryString ? `?${queryString}` : ''}`
        return await api.get(url)
    },

    async getProject(id) {
        return await api.get(`${ENDPOINTS.PROJECTS}/${id}`)
    },

    async getMyProjects(params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const url = `${ENDPOINTS.MY_PROJECTS}${queryString ? `?${queryString}` : ''}`
        return await api.get(url)
    },

    async createProject(projectData) {
        return await api.post(ENDPOINTS.PROJECTS, projectData)
    },

    async updateProject(id, projectData) {
        return await api.put(`${ENDPOINTS.PROJECTS}/${id}`, projectData)
    },

    async deleteProject(id) {
        return await api.delete(`${ENDPOINTS.PROJECTS}/${id}`)
    },

    async updateProjectSkills(id, skills) {
        const url = ENDPOINTS.PROJECT_SKILLS.replace(':id', id)
        return await api.patch(url, { skills })
    },

    async updateProjectLinks(id, links) {
        const url = ENDPOINTS.PROJECT_LINKS.replace(':id', id)
        return await api.patch(url, links)
    },

    async searchProjects(params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const url = `${ENDPOINTS.SEARCH_PROJECTS}${queryString ? `?${queryString}` : ''}`
        return await api.get(url)
    }
}