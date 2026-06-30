import api from './Api';


export const getLivekitToken = async (body) => {
    const response = await api.post('/livekit/token', body);

    console.log("Response: ");
    console.log(response);
    return response.data.token;
}