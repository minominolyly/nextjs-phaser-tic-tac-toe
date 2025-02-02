import type { NextConfig } from "next";

const urlPrefix = process.env.URL_PREFIX ? `/${process.env.URL_PREFIX}` : ``;

const nextConfig: NextConfig = {
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  output: "export",
  trailingSlash: true,
  reactStrictMode: false,
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default nextConfig;
