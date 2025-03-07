import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { getCookie } from "cookies-next";

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

  if (!token) {
    throw new Error("Authentication token is missing or expired.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${url}`, {
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

export const serverFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${url}`, {
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
