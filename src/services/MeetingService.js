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
    return response.data;
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    throw error;
  }
};