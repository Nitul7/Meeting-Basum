import axios from 'axios';
import api from './Api';

export const getLivekitToken = async (meetingId, code) => {
    const response = await api.post('/livekit/token', { meetingId, code });
    return response.data.token;
};

export const getGuestLivekitToken = async (meetingId, name) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/livekit/guest-token`, { meetingId, name });
    return response.data.token;
};
