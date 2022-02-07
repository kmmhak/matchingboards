import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getById = async (id) => {
  try {
    const user = await axios.get(`${BASE_URL}/users/${id}`);
    return user;
  } catch (error) {
    throw Error(`Error fetching user: ${error.message}`);
  }
};

export const login = async (input) => {
  try {
    await axios.post(`${BASE_URL}/login`, input);
  } catch (error) {
    throw Error(`Error logging in: ${error.messge}`);
  }
};
