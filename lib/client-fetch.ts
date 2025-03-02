import { getCookie } from "cookies-next";

export const clientFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  requiredAuth: boolean,
  body?: any
) => {
  try {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api${url}`;

    const headers: Record<string, string> = {
      "content-type": "application/json",
    };

    if (requiredAuth) {
      const token = await getCookie("authToken");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error("Authentication token is missing.");
      }
    }

    const response = await fetch(API_URL, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
