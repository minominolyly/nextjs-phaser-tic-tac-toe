import type { Metadata } from "next";
import { Noto_Serif_JP, Potta_One } from "next/font/google";
import "./globals.css";
import AppConfig from "@/configurations/app.config";

const NotoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-family-noto-serif-jp",
  weight: "400",
});

const pottaOne = Potta_One({
  subsets: ["latin"],
  variable: "--font-family-potta-one",
  weight: "400",
});

const TITLE = "Next.js Phaser Tic Tac Toe";
const DESCRIPTION = "Next.js Phaser Tic Tac Toe by minominolyly.";
const EYECATCH = `${AppConfig.BASE_URL}/images/eyecatch.png`;

export const metadata: Metadata = {
  metadataBase: new URL(AppConfig.BASE_URL),
  title: {
    default: TITLE,
    template: "%s / Next.js Phaser Tic Tac Toe",
  },
  description: DESCRIPTION,
  robots: {
    index: true,
  },
  icons: [`${AppConfig.BASE_URL}/favicon.ico`],
  manifest: `${AppConfig.BASE_URL}/manifest.webmanfest`,
  openGraph: {
    title: {
      default: TITLE,
      template: "%s / Next.js Phaser Tic Tac Toe",
    },
    type: "website",
    url: `${AppConfig.BASE_URL}`,
    images: [
      {
        url: EYECATCH,
        alt: TITLE,
      },
    ],
  },
  appleWebApp: {
    statusBarStyle: "default",
  },
  twitter: {
    card: "summary",
    site: "@minominolyly",
    creator: "@minominolyly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head></head>
      <body className={`${NotoSerifJp.variable} ${pottaOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
