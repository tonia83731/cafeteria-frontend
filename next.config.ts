import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i.imgur.com"],
  },
};

export default withNextIntl(nextConfig);
