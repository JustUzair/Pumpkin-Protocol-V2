import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SubLayout } from "./sub-layout";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zk-Index",
  description: "A decentralized exchange dApp created with solidity and Nextjs",
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
      media: "(prefers-color-scheme:light)",
    },
    {
      url: "/logo.png",
      href: "/logo.png",
      media: "(prefers-color-scheme:dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SubLayout>{children}</SubLayout>
      </body>
    </html>
  );
}
