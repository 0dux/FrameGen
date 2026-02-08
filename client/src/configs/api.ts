import axios from "axios";

// In production, use relative URLs to go through Vercel proxy (same-origin)
// In development, use the local server URL
const isDev = import.meta.env.DEV;

const api = axios.create({
    baseURL: isDev ? (import.meta.env.VITE_BASE_URL || "http://localhost:3000") : "",
    withCredentials: true
})

export default api;