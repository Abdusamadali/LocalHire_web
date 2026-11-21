
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach the auth token to every request when available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Log every API error (status + backend response body) to the console
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(
                `API Error [${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
                error.response.data,
            );
        } else if (error.request) {
            console.error("API Error: no response from server", error.request);
        } else {
            console.error("API Error:", error.message);
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
