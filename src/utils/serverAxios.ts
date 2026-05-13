import { cookies } from "next/headers";
import axios from "axios";

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
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
    headers: { Cookie: cookieHeader }
  });
}
