// import axios from 'axios';

// export const GATEWAY_URL = 'http://localhost:8080';

// const axiosInstance = axios.create({
//     baseURL: GATEWAY_URL
// });

// axiosInstance.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('userId');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const GATEWAY_URL = 'http://localhost:8080';

// const axiosInstance = axios.create({
//     baseURL: GATEWAY_URL
// });

// axiosInstance.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 401) {
//             // Check if it's a cart operation
//             if (error.config.url.includes('/api/cart')) {
//                 toast.error('Please login to manage cart');
//                 return Promise.reject(error);
//             }
//             // Only clear storage and redirect for non-cart operations
//             localStorage.removeItem('token');
//             localStorage.removeItem('userId');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

import axios from 'axios';
import { toast } from 'react-toastify';

export const GATEWAY_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: GATEWAY_URL
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Add userId to cart requests
    if (config.url.includes('/api/cart') && userId) {
        if (!config.data) {
            config.data = {};
        }
        config.data.userId = userId;
    }

    return config;
}, error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Response error:', error);

        if (error.response?.status === 400) {
            const message = error.response.data?.message || 'Invalid request';
            toast.error(message);
            return Promise.reject(new Error(message));
        }

        if (error.response?.status === 401) {
            if (error.config.url.includes('/api/cart')) {
                toast.error('Please login to manage cart');
                return Promise.reject(new Error('Authentication required'));
            }
            
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/login';
        }

        const errorMessage = error.response?.data?.message || 'Operation failed';
        toast.error(errorMessage);
        return Promise.reject(error);
    }
);

export default axiosInstance;