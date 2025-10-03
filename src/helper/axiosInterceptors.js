import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://79611141c5a6.ngrok-free.app/",
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
