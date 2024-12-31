import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { getCookie } from "cookies-next";
// console.log(process.env.NEXT_PUBLIC_API_URL);
type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: HeadersInit;
  token?: any;
};
type IContext = {
  req: IncomingMessage & { cookies: NextApiRequestCookies };
  res: ServerResponse;
};

export const authFetch = async (
  ctx: IContext,
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: any
) => {
  const { req, res } = ctx;
  const token = await getCookie("authToken", { req, res });

  // console.log(token);
  if (!token) {
    throw new Error("Authentication token is missing or expired.");
  }

  const response = await fetch(`${process.env.API_URL}/api${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
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
    const isFormData = body instanceof FormData;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api${url}`,
      {
        method,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...(token && { Authorization: `Bearer ${token}` }),
          ...headers,
        },
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }
    // console.log(response);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const serverFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any
) => {
  const response = await fetch(`${process.env.API_URL}/api${url}`, {
    method,
    headers: {
      "content-type": "application/json",
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
