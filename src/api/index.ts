import { RequestInit } from "next/dist/server/web/spec-extension/request";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
// console.log(BASE_URL);
export const fetchRequest = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
  token?: string
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("API fetching error:", error);
    return null;
  }
};
