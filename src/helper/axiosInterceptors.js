import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://9c4e206e2bd6.ngrok-free.app/api/v1",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
