function getApiBase(): string {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

const API_BASE = getApiBase();

export interface ApiError {
  message: string;
  status: number;
  body?: { mensaje?: string; error?: string };
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  let data: unknown = null;
  if (isJson) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  }

  const body = data as { mensaje?: string; error?: string } | null;

  if (!res.ok) {
    const message =
      body?.mensaje || body?.error || res.statusText || "Error en la solicitud";
    const err: ApiError = {
      message,
      status: res.status,
      body: body ?? undefined,
    };
    throw err;
  }

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined as T;
  }

  return (isJson ? data : undefined) as T;
}

export async function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: "GET" });
}

export async function post<T>(path: string, data?: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function patch<T>(path: string, data?: unknown): Promise<T> {
  return request<T>(path, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: "DELETE" });
}
