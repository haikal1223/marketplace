import axios from "axios";
import { getInternalApiBaseUrl } from "lib/internal-url";

/** Browser: same-origin (`""`). Server: deployment URL or localhost (never bare localhost on Vercel). */
const axiosInstance = axios.create({
  baseURL: typeof window !== "undefined" ? "" : getInternalApiBaseUrl(),
});

export default axiosInstance;
