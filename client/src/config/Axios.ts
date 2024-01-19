import axios from "axios";

const apiInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.API_URL_DEVELOPMENT
      : process.env.API_URL_PRODUCTION,
  timeout: 3000,
  withCredentials: true,
});

export default apiInstance;
