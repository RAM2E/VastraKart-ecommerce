import axios from 'axios';

export const GATEWAY_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: GATEWAY_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axiosInstance;