import axios from 'axios';
import { removeAccessToken, removeRefreshToken } from '../utils/localstorage';

export const register = async (fullName, email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { fullName, email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
    return response.data;
};


export const logout = async () => {
    removeAccessToken();
    removeRefreshToken();
};