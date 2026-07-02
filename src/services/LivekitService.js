import api from './Api';

export const getLivekitToken = async (meetingId) => {
    const response = await api.post('/livekit/token', { meetingId });
    return response.data.token;
};