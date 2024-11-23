import axios from 'axios';

const API_URL = 'https://api.fraudguard.ai/v1'; // Replace with your actual API URL

export const fetchModelTypes = async () => {
  const response = await axios.get(`${API_URL}/model-types`);
  return response.data;
};

export const submitConfiguration = async (config) => {
  const response = await axios.post(`${API_URL}/submit-configuration`, config);
  return response.data;
};
