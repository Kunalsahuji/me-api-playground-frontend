import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain uppercase, lowercase, number and special character'
        )
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
})

export const profileUpdateSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required')
})

export const educationSchema = yup.object().shape({
    degree: yup
        .string()
        .required('Degree is required'),
    institution: yup
        .string()
        .required('Institution is required'),
    startYear: yup
        .number()
        .min(1900, 'Invalid year')
        .max(new Date().getFullYear(), 'Year cannot be in the future')
        .required('Start year is required'),
    endYear: yup
        .number()
        .min(1900, 'Invalid year')
        .max(new Date().getFullYear() + 10, 'Invalid end year')
        .when('startYear', (startYear, schema) =>
            startYear ? schema.min(startYear, 'End year must be after start year') : schema
        )
        .nullable(),
    description: yup.string().max(500, 'Description must be less than 500 characters')
})

export const workSchema = yup.object().shape({
    company: yup
        .string()
        .required('Company is required'),
    role: yup
        .string()
        .required('Role is required'),
    location: yup
        .string()
        .required('Location is required'),
    startDate: yup
        .string()
        .required('Start date is required'),
    endDate: yup
        .string()
        .nullable(),
    description: yup.string().max(1000, 'Description must be less than 1000 characters')
})

export const projectSchema = yup.object().shape({
    title: yup
        .string()
        .min(3, 'Title must be at least 3 characters')
        .required('Project title is required'),
    description: yup
        .string()
        .max(1000, 'Description must be less than 1000 characters'),
    skills: yup
        .array()
        .of(yup.string())
        .min(1, 'At least one skill is required'),
    links: yup.object().shape({
        github: yup.string().url('Invalid URL format').nullable(),
        live: yup.string().url('Invalid URL format').nullable(),
        demo: yup.string().url('Invalid URL format').nullable()
    })
})

export const linksSchema = yup.object().shape({
    github: yup.string().url('Invalid URL format').nullable(),
    linkedin: yup.string().url('Invalid URL format').nullable(),
    portfolio: yup.string().url('Invalid URL format').nullable(),
    resume: yup.string().url('Invalid URL format').nullable()
})