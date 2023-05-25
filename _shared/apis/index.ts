import axios from "axios";
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: process.env.FIGMA_API_BASE_URL,
  headers: {},
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["x-figma-token"] = process.env.FIGMA_API_TOKEN;
  return config;
});

export default axiosInstance;
