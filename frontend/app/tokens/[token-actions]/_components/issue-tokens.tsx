"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Error } from "@/components/error";
import { Label } from "@/components/ui/label";
import contractAddresses from "../../../../constants/networkMappings.json";
import mintAllUtilityAbi from "../../../../constants/MintAllUtliity.json";
import FACTORY_ABI from "../../../../constants/FACTORY_ABI.json";
import ERC20_ABI from "../../../../constants/ERC20_ABI.json";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { ethers } from "ethers";
import { PlusCircle } from "lucide-react";

export const IssueTokens = ({ defaultTokenAddress }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isLoaded, setIsLoaded] = useState(false);
  const chainId = (chain?.id?.toString() as string) || ("" as string);
  const [tokenAddress, setTokenAddress] = useState<string>(defaultTokenAddress);
  const [tokenAmount, setTokenAmount] = useState(1);
  const TokenFactoryAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses][
          "TokenFactory"
        ][
          contractAddresses[chainId as keyof typeof contractAddresses][
            "TokenFactory"
          ].length - 1
        ]
      : null;
  const USDCAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses]["USDC"][
          contractAddresses[chainId as keyof typeof contractAddresses]["USDC"]
            .length - 1
        ]
      : null;
  const WETHAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses]["WETH"][
          contractAddresses[chainId as keyof typeof contractAddresses]["WETH"]
            .length - 1
        ]
      : null;
  const WBTCAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses]["WBTC"][
          contractAddresses[chainId as keyof typeof contractAddresses]["WBTC"]
            .length - 1
        ]
      : null;
  const MATICAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses]["MATIC"][
          contractAddresses[chainId as keyof typeof contractAddresses]["MATIC"]
            .length - 1
        ]
      : null;
  const AAVEAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses]["AAVE"][
          contractAddresses[chainId as keyof typeof contractAddresses]["AAVE"]
            .length - 1
        ]
      : null;

  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenNames, setTokenNames] = useState<any[]>([]);
  const [tokenSymbols, setTokenSymbols] = useState<any[]>([]);
  const [underlyingTokens, setUnderlyingTokens] = useState<any[]>([]);
  const [tokenRatios, setTokenRatios] = useState<any[]>([]);

  const TokenFactoryContract: any = {
    address: TokenFactoryAddress,
    abi: FACTORY_ABI,
  };
  const { data, isFetching, isLoading, isSuccess } = useContractReads({
    contracts: [
      {
        ...TokenFactoryContract,
        functionName: "getAllNames",
        args: [address],
      },
      {
        ...TokenFactoryContract,
        functionName: "getAllSymbols",
        args: [address],
      },
      {
        ...TokenFactoryContract,
        functionName: "getAllTokenAddresses",
        args: [address],
      },
      {
        ...TokenFactoryContract,
        functionName: "getAllPercentages",
        args: [tokenAddress],
      },
      {
        ...TokenFactoryContract,
        functionName: "getAllUnderlying",
        args: [tokenAddress],
      },
    ],
  });

  async function getUserIndexTokens() {
    if (data !== undefined) {
      setTokenNames(data[0].result);
      setTokenSymbols(data[1].result);
      setTokens(data[2].result);
      setTokenRatios(data[3].result);
      setUnderlyingTokens(data[4].result);
    }
  }

  useEffect(() => {
    console.log("====================================");
    console.log("Effect");
    console.log("====================================");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      getUserIndexTokens();
    }
  }, [address, isLoaded]);
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  //   const { data, isLoading, isSuccess, write } = useContractWrite({
  //     address: TokenFactoryAddress as keyof typeof TokenFactoryAddress,
  //     abi: FACTORY_ABI,
  //     functionName: "issueToken",
  //     args: [tokenAddress, ethers.parseEther(tokenAmount.toString())],
  //   });
  const approveTokens = async () => {
    try {
      let signer = null;

      let provider;
      if (window?.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window?.ethereum);

        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.
        signer = await provider.getSigner();
      }
      const WETH = new ethers.Contract(
        WETHAddress as keyof typeof WETHAddress,
        ERC20_ABI,
        provider
      );
      const USDC = new ethers.Contract(
        USDCAddress as keyof typeof USDCAddress,
        ERC20_ABI,
        provider
      );
      const WBTC = new ethers.Contract(
        WBTCAddress as keyof typeof WBTCAddress,
        ERC20_ABI,
        provider
      );
      const WMATIC = new ethers.Contract(
        MATICAddress as keyof typeof MATICAddress,
        ERC20_ABI,
        provider
      );
      const AAVE = new ethers.Contract(
        AAVEAddress as keyof typeof AAVEAddress,
        ERC20_ABI,
        provider
      );
      const tokenArrayLength = tokenRatios.length;

      // console.log(tokenArrayLength);
      if (tokenArrayLength >= 1 && underlyingTokens[0] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);

        await USDCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[0])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[1])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[2])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[3])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[4])) * tokenAmount
            ).toString()
          )
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[0])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[1])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[2])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[3])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[4])) * tokenAmount
            ).toString()
          )
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[0])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[1])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[2])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[3])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[4])) * tokenAmount
            ).toString()
          )
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == MATICAddress) {
        const WMATICWithSigner = WMATIC.connect(signer);
        await WMATICWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[0])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == MATICAddress) {
        const WMATICWithSigner = WMATIC.connect(signer);
        await WMATICWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[1])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == MATICAddress) {
        const WMATICWithSigner = WMATIC.connect(signer);
        await WMATICWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[2])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == MATICAddress) {
        const WMATICWithSigner = WMATIC.connect(signer);
        await WMATICWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[3])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == MATICAddress) {
        const WMATICWithSigner = WMATIC.connect(signer);
        await WMATICWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[4])) * tokenAmount
            ).toString()
          )
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[0])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[1])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[2])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[3])) * tokenAmount
            ).toString()
          )
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.parseEther(
            (
              parseFloat(ethers.formatEther(tokenRatios[4])) * tokenAmount
            ).toString()
          )
        );
      }

      // console.log("====================================");
      // console.log(
      //   ethers.parseEther(
      //     (
      //       parseFloat(ethers.formatEther(tokenRatios[0])) * tokenAmount
      //     ).toString()
      //   )
      // );
      console.log("====================================");
    } catch (err: any) {
      //   window.alert(err);
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      toast.error(err.message);
    }
  };
  async function issueTokenFromContract() {
    await approveTokens();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[100%] border-2 dark:bg-slate-900 text-white bg-violet-700 border-slate-900 dark:border-white hover:bg-violet-500 dark:hover:bg-slate-800">
          Issue Token{" "}
          <span className="ml-2">
            <PlusCircle className="h-4 w-4" />
          </span>
        </Button>
      </DialogTrigger>

      {chain === undefined ||
      !(chainId in contractAddresses) ||
      !TokenFactoryAddress ? (
        <DialogContent>
          {/* <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-xl mt-3"
        role="alert"
      >
        <p className="font-bold">No valid Chain found!</p>
        <p>Connect to valid network to get utility tokens.</p>
      </div> */}
          <Error />
        </DialogContent>
      ) : (
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Issue Index Tokens</DialogTitle>
            <DialogDescription>
              Get your underlying test tokens for testing the dApp
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Token Address
              </Label>
              <Input
                type="text"
                placeholder="Address of Index Token"
                value={tokenAddress}
                className="w-[100%]"
                onChange={(e) => {
                  setTokenAddress(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Token Amount
              </Label>
              <Input
                type="number"
                placeholder="Amount of Index Token in ether"
                value={tokenAmount}
                onChange={(e) => {
                  setTokenAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={tokenAmount <= 0}
              onClick={() => {
                getUserIndexTokens();
                issueTokenFromContract();
              }}
            >
              Issue Tokens
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
