import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: " https://3c1b77514e05.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
