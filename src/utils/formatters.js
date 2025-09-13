import { format, parseISO, isValid } from 'date-fns'

export const formatDate = (dateString, formatString = 'MMM yyyy') => {
    if (!dateString) return 'Present'

    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
        if (!isValid(date)) return dateString
        return format(date, formatString)
    } catch (error) {
        return dateString
    }
}

export const formatFullDate = (dateString) => {
    return formatDate(dateString, 'dd MMM yyyy')
}

export const formatYearRange = (startYear, endYear) => {
    if (!startYear) return ''
    return `${startYear} - ${endYear || 'Present'}`
}

export const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    return `${start} - ${end}`
}

export const truncateText = (text, maxLength = 100) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}

export const capitalizeFirst = (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatSkills = (skills) => {
    if (!Array.isArray(skills)) return []
    return skills.filter(Boolean).map(skill => skill.trim())
}

export const getInitials = (name) => {
    if (!name) return 'U'
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
}

export const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
}

export const isValidUrl = (string) => {
    try {
        new URL(string)
        return true
    } catch (_) {
        return false
    }
}

export const extractDomain = (url) => {
    try {
        return new URL(url).hostname
    } catch (_) {
        return url
    }
}