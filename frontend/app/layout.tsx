"use client";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/navbar";
import { ClerkClientProvider } from "@/components/providers/clerk-provider";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonZkEvmTestnet, polygonZkEvm } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { useTheme } from "next-themes";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// export const metadata: Metadata = {
//   title: "Uni-Swapp",
//   description: "A decentralized exchange dApp created with solidity and Nextjs",
//   icons: [
//     {
//       url: "/logo.png",
//       href: "/logo.png",
//       media: "(prefers-color-scheme:light)",
//     },
//     {
//       url: "/logo.png",
//       href: "/logo.png",
//       media: "(prefers-color-scheme:dark)",
//     },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, publicClient } = configureChains(
    [polygonZkEvm, polygonZkEvmTestnet],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
      jsonRpcProvider({
        rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
      }),
    ]
  );

  const polygonZkTestnet = {
    id: 1422,
    name: "Polygon Zk Testnet ",
    network: "Polygon Zk  Testnet",

    rpcUrls: {
      default: {
        http: ["https://rpc.public.zkevm-test.net"],
      },
    },
    blockExplorers: {
      default: {
        name: "Polygon Zk Testnet",
        url: "https://testnet-zkevm.polygonscan.com/",
      },
    },

    testnet: true,
  };
  const { connectors } = getDefaultWallets({
    appName: "zk-index",
    projectId: "84a7a0b348562e18afb0114fd15c1a67",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  const { resolvedTheme } = useTheme();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="motion-theme-dark"
        >
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              chains={chains}
              showRecentTransactions={true}
              coolMode
            >
              <Toaster position="bottom-center" />
              <Navbar />

              <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-full min-w-full dark:from-black dark:to-[#292E49]">
                {children}
              </div>

              <footer className="bg-[#fafafa] dark:bg-black z-[99999]">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <a
                      href="https://flowbite.com/"
                      className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                      <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                      />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Flowbite
                      </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                      <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                          About
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                          Licensing
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                  <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                  <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{" "}
                    <a href="https://flowbite.com/" className="hover:underline">
                      Flowbite™
                    </a>
                    . All Rights Reserved.
                  </span>
                </div>
              </footer>
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
