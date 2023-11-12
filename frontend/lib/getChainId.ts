import { createPublicClient, http } from "viem";
import { polygonZkEvmTestnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygonZkEvmTestnet,
  transport: http(),
});
