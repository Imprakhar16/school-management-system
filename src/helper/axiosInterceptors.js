import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://72c7170b299a.ngrok-free.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
