import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Services API
export const servicesApi = {
    getAll: (category) => api.get('/services', { params: { category } }),
    getById: (id) => api.get(`/services/${id}`),
};

// Rentals API
export const rentalsApi = {
    getAll: (category) => api.get('/rentals', { params: { category } }),
    getById: (id) => api.get(`/rentals/${id}`),
};

// Testimonials API
export const testimonialsApi = {
    getAll: (featuredOnly = false) => api.get('/testimonials', { params: { featured_only: featuredOnly } }),
};

// Gallery API
export const galleryApi = {
    getAll: (category, featuredOnly = false) => api.get('/gallery', { params: { category, featured_only: featuredOnly } }),
};

// FAQ API
export const faqApi = {
    getAll: (category) => api.get('/faq', { params: { category } }),
};

// Blog API
export const blogApi = {
    getAll: (tag) => api.get('/blog', { params: { tag } }),
    getBySlug: (slug) => api.get(`/blog/${slug}`),
};

// Contact/Quote API
export const contactApi = {
    submitQuote: (data) => api.post('/contact', data),
};

// Seed API
export const seedApi = {
    seed: () => api.post('/seed'),
};

export default api;
