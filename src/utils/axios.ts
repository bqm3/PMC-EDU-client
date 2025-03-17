import axios from "axios";
import { HOST_API_KEY } from "../config";

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

const getAccessToken = () => localStorage.getItem("accessToken");
const getrefreshToken = () => localStorage.getItem("refreshToken");
const setAccessToken = (token: string) => localStorage.setItem("accessToken", token);

const refreshAccessToken = async () => {
  try {
    const refreshToken = getrefreshToken();
    const response = await axios.post(`${HOST_API_KEY}/api/v1/hosons/refresh`, { refreshToken });
    const newAccessToken = response.data.accessToken;

    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

// Thêm accessToken vào request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token&& config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
