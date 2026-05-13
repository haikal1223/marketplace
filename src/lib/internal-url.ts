/**
 * Base URL for server-side HTTP calls to this app's own API routes.
 * On Vercel, `VERCEL_URL` is set (hostname only, no scheme).
 * In the browser, prefer same-origin (see axiosInstance).
 */
export function getInternalApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
