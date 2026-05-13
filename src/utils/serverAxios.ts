import { cookies } from "next/headers";
import axios from "axios";
import { getInternalApiBaseUrl } from "lib/internal-url";

/**
 * Returns an axios instance that forwards the current request's cookies.
 * Use this in Server Components / server-side cache functions that call
 * authenticated API routes. Client components should use the default
 * axiosInstance instead.
 */
export async function getServerAxios() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return axios.create({
    baseURL: getInternalApiBaseUrl(),
    headers: { Cookie: cookieHeader },
  });
}
