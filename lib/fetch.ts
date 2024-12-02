const apiUrl = process.env.API_URL;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: HeadersInit;
  token?: any;
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

export const clientFetch = async (url: string, options: FetchOptions = {}) => {
  const { method = "GET", body, headers, token } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if provided
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
