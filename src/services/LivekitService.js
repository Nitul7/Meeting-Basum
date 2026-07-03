import api from './Api';
import publicApi from './PublicApi';

export const getLivekitToken = async (meetingId, code) => {
    const response = await api.post('/livekit/token', { meetingId, code });
    return response.data.token;
};

export const getGuestLivekitToken = async (meetingId, name, code) => {
    const response = await publicApi.post('/livekit/guest-token', { meetingId, name, code });
    return response.data.token;
};
