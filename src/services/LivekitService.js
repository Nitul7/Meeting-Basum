import api from './Api';

export const getLivekitToken = async (meetingId, code) => {
    const response = await api.post('/livekit/token', { meetingId, code });
    return response.data.token;
};
