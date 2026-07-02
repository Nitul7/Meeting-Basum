import api from "./Api";

const URL = "/meetings/";

export const scheduleMeeting = async (meetingData) => {
  try {
    const response = await api.post(URL, meetingData);
    return response;
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    throw error;
  }
};

export const verifyMeetingCode = async (idOrLink) => {
  try {
    const meetingId = idOrLink.trim().split("/").pop();
    const response = await api.get(`${URL}${meetingId}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying meeting code:', error);
    throw error;
  }
};

export const createInstantMeeting = async () => {
  try {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    const response = await api.post(URL, {
      title: "Instant Meeting",
      visibility: "private",
      startTime,
      endTime,
      duration: "1hr",
    });
    return response.data;
  } catch (error) {
    console.error('Error creating instant meeting:', error);
    throw error;
  }
};

export const getMeetings = async () => {
  try {
    const response = await api.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error getting meetings:', error);
    throw error;
  }
};
