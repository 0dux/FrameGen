import axios from "axios";

const isDev = import.meta.env.DEV;

const api = axios.create({
    baseURL: isDev ? (import.meta.env.VITE_BASE_URL || "http://localhost:3000") : "",
    withCredentials: true
})

export default api;