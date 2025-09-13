import api from './api'
import { ENDPOINTS } from '../utils/constants'

export const profileService = {
    async getProfiles(params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const url = `${ENDPOINTS.PROFILES}${queryString ? `?${queryString}` : ''}`
        return await api.get(url)
    },

    async getProfileById(id) {
        return await api.get(`${ENDPOINTS.PROFILES}/${id}`)
    },

    async getCurrentProfile() {
        return await api.get(ENDPOINTS.MY_PROFILE)
    },

    async updateProfile(profileData) {
        return await api.put(ENDPOINTS.UPDATE_PROFILE, profileData)
    },

    async deleteProfile() {
        return await api.delete(ENDPOINTS.DELETE_PROFILE)
    },

    async updateSkills(skills) {
        return await api.patch(ENDPOINTS.UPDATE_SKILLS, { skills })
    },

    async addEducation(educationData) {
        return await api.post(ENDPOINTS.ADD_EDUCATION, educationData)
    },

    async addWork(workData) {
        return await api.post(ENDPOINTS.ADD_WORK, workData)
    },

    async updateLinks(linksData) {
        return await api.patch(ENDPOINTS.UPDATE_LINKS, linksData)
    }
}