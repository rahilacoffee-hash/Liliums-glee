import axios from "axios";

// Safari can block cookies sent to an API hosted on an unrelated domain.
// In production, route requests through Vercel's same-origin /api rewrite so
// the browser treats the session cookie as first-party. Keep VITE_API_URL for
// local development, where Vite is not serving the Vercel rewrite.
const apiBaseURL = import.meta.env.PROD
  ? "/api"
  : import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      try {
        await axiosInstance.post("/user/refresh-token");

        processQueue();

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);

       

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
