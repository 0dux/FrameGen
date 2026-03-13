import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

const api = axios.create({
  baseURL: isDev
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:4040"
    : "", // use relative URLs in production (proxied by frontend server)
  withCredentials: true,
});
export default api;
