import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ideasApi = {
    getAll: (status) => api.get('/ideas', { params: { status } }),
    getById: (id) => api.get(`/ideas/${id}`),
    create: (data) => api.post('/ideas', data),
    update: (id, data) => api.put(`/ideas/${id}`, data),
    delete: (id) => api.delete(`/ideas/${id}`),
    promote: (id) => api.post(`/ideas/${id}/promote`),
};

export default api;
