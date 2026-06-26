import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const scheduleMeeting = (meetingData) => {
  return API.post("/meeting/schedule", meetingData);
};