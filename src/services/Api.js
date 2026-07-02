import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, removeAccessToken, removeRefreshToken } from '../utils/localstorage';
import { refreshAccessToken } from './AuthService';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const newAccessToken = await refreshAccessToken(refreshToken);
                setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = newAccessToken;
                return api(originalRequest);
            } catch (refreshError) {
                removeAccessToken();
                removeRefreshToken();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
