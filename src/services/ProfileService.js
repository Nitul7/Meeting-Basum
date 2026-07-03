import api from "./Api";

const URL = "/profiles/";

export const getMyProfile = async () => {
  try {
    const response = await api.get(`${URL}me`);
    return response.data.data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

export const updateMyProfile = async (data) => {
  try {
    const response = await api.patch(`${URL}me`, data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    const response = await api.post(`${URL}me/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};
