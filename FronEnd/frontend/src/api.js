import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Esto apunta a tu API en Laravel
});

export default api;
