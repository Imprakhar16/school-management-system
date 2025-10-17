import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://unhardened-kizzie-turdiform.ngrok-free.dev/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
