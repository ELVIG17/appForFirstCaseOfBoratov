type ApiError = { message?: string };

const BASE_URL = 'https://automatic-broccoli-6945456jj9pvf4w9j-3000.app.github.dev';

export async function http<T>(
  path: string,
  options: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const { json, headers, ...rest } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: json ? JSON.stringify(json) : rest.body,
    credentials: "include",
  });

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Response is not JSON:", text.substring(0, 200));
      throw new Error(`Server returned non-JSON response (status ${res.status})`);
    }
  }

  if (!res.ok) {
    const msg =
      (data as ApiError | null)?.message ||
      `Request failed: ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return data as T;
}
