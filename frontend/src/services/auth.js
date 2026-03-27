import axios from "axios";
const API_URL = "http://localhost:5000/api/auth"; // backend URL

export const login = async ({ email, password }) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = async ({ username, email, password }) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};


export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user;
  } catch (err) {
    return null;
  }
};