import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
