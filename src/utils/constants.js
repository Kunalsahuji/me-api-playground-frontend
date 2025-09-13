export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

export const ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    CURRENT_USER: '/auth/me',

    // Profile
    PROFILES: '/profile',
    MY_PROFILE: '/profile/me/profile',
    UPDATE_PROFILE: '/profile/me',
    DELETE_PROFILE: '/profile/me',
    UPDATE_SKILLS: '/profile/me/skills',
    ADD_EDUCATION: '/profile/me/education',
    ADD_WORK: '/profile/me/work',
    UPDATE_LINKS: '/profile/me/links',

    // Projects
    PROJECTS: '/project',
    MY_PROJECTS: '/project/user/my',
    SEARCH_PROJECTS: '/project/search',
    PROJECT_SKILLS: '/project/:id/skills',
    PROJECT_LINKS: '/project/:id/links',

    // Health
    HEALTH: '/health'
}

export const SKILLS_OPTIONS = [
    'JavaScript',
    'TypeScript',
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'Express.js',
    'Next.js',
    'Nuxt.js',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Firebase',
    'Tailwind CSS',
    'Bootstrap',
    'SASS',
    'CSS',
    'HTML',
    'Python',
    'Django',
    'Flask',
    'Java',
    'Spring Boot',
    'C++',
    'C#',
    '.NET',
    'PHP',
    'Laravel',
    'Ruby',
    'Ruby on Rails',
    'Go',
    'Rust',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Google Cloud',
    'Git',
    'GitHub',
    'GitLab',
    'Jenkins',
    'Redux',
    'MobX',
    'GraphQL',
    'REST API',
    'Socket.IO',
    'WebSocket',
    'Jest',
    'Cypress',
    'Selenium',
    'Figma',
    'Adobe XD',
    'Photoshop'
]

export const EDUCATION_LEVELS = [
    'High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Certificate',
    'Bootcamp',
    'Online Course'
]

export const WORK_TYPES = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
    'Remote',
    'Hybrid'
]

export const PROJECT_CATEGORIES = [
    'Web Application',
    'Mobile App',
    'Desktop App',
    'E-commerce',
    'Social Media',
    'Portfolio',
    'Landing Page',
    'Dashboard',
    'API',
    'Game',
    'AI/ML',
    'Blockchain',
    'IoT',
    'Other'
]