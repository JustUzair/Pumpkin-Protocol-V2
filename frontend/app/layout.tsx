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
import { Footer } from "@/components/footer";

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

              <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-full min-w-full dark:from-black dark:to-[#292E49] mb-[10em]">
                {children}
              </div>

              <Footer />
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
