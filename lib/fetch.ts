const apiUrl = process.env.API_URL;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: HeadersInit;
};

export const defaultfetch = async (
  url: string,
  options: FetchOptions = { method: "GET" }
) => {
  const { method, body, headers } = options;
  const response = await fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};
