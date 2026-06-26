import axios from "axios";

const API_URL = "http://localhost:4000/meetings";

export const scheduleMeeting = async (meetingData) => {
  return await axios.post(API_URL, meetingData);
};