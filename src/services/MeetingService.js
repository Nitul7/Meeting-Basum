import axios from "axios";
import api from "./Api";

const URL = "/meetings/";

export const scheduleMeeting = async (meetingData) => {
  try {
    console.log("Meeting data: ");
    console.log(meetingData);
    const response = await api.post(URL, meetingData);
    console.log("Response: ");
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    throw error;
  }
};

export const verifyMeetingCode = async (meeting) => {
  try {

    const meetingId = meeting.split("/").pop();
    const response = await api.get(`${URL}join?meetingId=${meetingId}`);
    return response;
  } catch (error) {
    console.error('Error verifying meeting code:', error);
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