import publicApi from './PublicApi';
import { removeAccessToken, removeRefreshToken } from '../utils/localstorage';

export const register = async (name, email, password) => {
    const response = await publicApi.post('/auth/register', { name, email, password });
    return response;
};

export const login = async (email, password) => {
    const response = await publicApi.post('/auth/login', { email, password });
    return response.data;
};


export const logout = async () => {
    removeAccessToken();
    removeRefreshToken();
};

export const refreshAccessToken = async (refreshToken) => {
    const response = await publicApi.post('/auth/refresh', { refreshToken });
    return response.data.data.accessToken;
};