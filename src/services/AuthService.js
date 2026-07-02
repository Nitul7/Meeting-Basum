import axios from 'axios';
import { removeAccessToken, removeRefreshToken } from '../utils/localstorage';

export const register = async (name, email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { name, email, password }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const login = async (email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
    console.log("Response: ");
    console.log(response.data);
    return response.data;
};


export const logout = async () => {
    removeAccessToken();
    removeRefreshToken();
};