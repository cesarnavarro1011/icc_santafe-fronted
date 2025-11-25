import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Ajusta a tu URL
});

// Interceptor para agregar el token en cada request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
