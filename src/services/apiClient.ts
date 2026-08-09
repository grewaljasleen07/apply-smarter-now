/**
 * Simulated latency helper. Every service call goes through this so swapping
 * the mock implementation for real HTTP calls is a one-file change.
 */
export const delay = (ms = 600) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export type ApiResult<T> = { data: T };

export const ok = async <T>(data: T, ms?: number): Promise<T> => {
  await delay(ms);
  return data;
};

/**
 * Placeholder for the future MERN backend.
 * When the Express API exists, replace the mock service bodies with calls to
 * `request(path, init)` — the hooks and components above them stay unchanged.
 */
export const API_BASE_URL = "/api";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}
