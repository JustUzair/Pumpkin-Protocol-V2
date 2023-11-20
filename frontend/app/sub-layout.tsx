"use client";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/navbar";
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
import { publicProvider } from "wagmi/providers/public";
import { useTheme } from "next-themes";
import { Footer } from "@/components/footer";
export const SubLayout = ({ children }: { children: React.ReactNode }) => {
  const { chains, publicClient } = configureChains(
    [polygonZkEvm, polygonZkEvmTestnet],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
      publicProvider(),
    ]
  );

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
  return (
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

          <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen min-w-full dark:from-black dark:to-[#292E49] mb-[10em]">
            {children}
          </div>

          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};
