export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface HttpRequestParams {
  path: string;
  method?: HttpMethod;
  baseUrl?: string;
  headers?: HeadersInit;
}

export async function performRequest<T>({
  path,
  method = "GET",
}: HttpRequestParams): Promise<T> {
  try {
    const response = await fetch(path, { method });
    return (await response.json()) as T;
  } catch (error) {
    throw new Error(`HTTP Request Failed: Endpoint: ${path}`);
  }
}
