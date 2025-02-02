import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const TITLE = "Next.js Phaser Tic Tac Toe";
  const DESCRIPTION = "Next.js Phaser Tic Tac Toe by minominolyly.";
  return {
    name: TITLE,
    short_name: "Tic Tac Toe",
    description: DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#201940",
    theme_color: "#9e8eef",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icons/icon-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/icons/icon-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
