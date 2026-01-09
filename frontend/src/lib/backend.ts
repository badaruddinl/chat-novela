const backendUrl = process.env.BACKEND_URL ?? "http://localhost:4000";

export const getBackendUrl = (path: string) =>
  `${backendUrl.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;

export async function proxyBackend(
  path: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(getBackendUrl(path), init);
}
