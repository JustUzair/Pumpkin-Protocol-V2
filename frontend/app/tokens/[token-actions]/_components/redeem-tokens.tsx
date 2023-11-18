// @ts-nocheck
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
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { ethers } from "ethers";
import { PlusCircle, BadgeDollarSign } from "lucide-react";

import Image from "next/image";
export const RedeemTokens = ({
  defaultTokenAddress,
}: {
  defaultTokenAddress: string;
}) => {
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
  const [balance, setBalance] = useState<string>("0");
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
    structuralSharing: (prev, next) => (prev === next ? prev : next),
  });
  const {
    data: refetchBalanceData,
    isLoading: isBalanceRefetching,
    isError: balanceRefetchError,
    isSuccess: balanceRefetchSuccess,
  } = useContractReads({
    contracts: [
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [address],
      },
    ],
    structuralSharing: (prev, next) => (prev === next ? prev : next),
  });

  async function refetchBalance() {
    if (balanceRefetchError || !balanceRefetchSuccess || isBalanceRefetching)
      return;
    // console.log("====================================");
    // console.log(
    //   ethers.formatEther(refetchBalanceData[0].result?.toString(), "ether")
    // );
    // console.log("====================================");
    setBalance(
      ethers.formatEther(
        refetchBalanceData[0].result != null
          ? refetchBalanceData[0].result?.toString()
          : "0",
        "ether"
      )
    );
  }
  const {
    data: refetchData,
    isLoading: isRefetching,
    isError: refetchError,
    isSuccess: refetchSuccess,
  } = useContractReads({
    contracts: [
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
    structuralSharing: (prev, next) => (prev === next ? prev : next),
  });

  async function renderNewPercentages() {
    if (refetchError || !refetchSuccess || isRefetching) return;
    setTokenRatios(refetchData[0].result);
    setUnderlyingTokens(refetchData[1].result);
    // console.log(refetchData, tokenRatios);
  }

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
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      getUserIndexTokens();
    }
  }, [address, isLoaded]);

  useEffect(() => {
    renderNewPercentages();
    refetchBalance();
  }, [tokenAddress]);

  const {
    data: issueData,
    isLoading: issueLoading,
    isSuccess: issueSuccess,
    write: issueWrite,
    isError: isIssueError,
    error: issueError,
  } = useContractWrite({
    address: TokenFactoryAddress as keyof typeof TokenFactoryAddress,
    abi: FACTORY_ABI,
    functionName: "issueToken",
    args: [
      tokenAddress,
      ethers.parseEther(tokenAmount != "" ? tokenAmount.toString() : "0"),
    ],
  });
  if (issueSuccess) toast.success("Index token minted successfully!!");
  if (isIssueError) toast.error(issueError?.message);
  if (issueLoading)
    toast.loading("Please wait while we mint you your index token!");

  async function issueTokenFromContract() {
    await issueWrite();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-[100%] border-2 dark:bg-slate-900 text-white bg-violet-700 border-slate-900 dark:border-white hover:bg-violet-500 dark:hover:bg-slate-800"
          onClick={() => {
            setTokenAddress(defaultTokenAddress);
            renderNewPercentages();
            refetchBalance();
          }}
        >
          Redeem Token{" "}
          <span className="ml-2">
            <BadgeDollarSign className="h-4 w-4" />
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
              Issue an Index created by you or someone else
            </DialogDescription>
          </DialogHeader>
          <div className="token-percentages">
            <h3 className="text-left tracking-wider font-semibold px-3 py-2">
              Token Composition (Modify index address below to see it's
              composition)
            </h3>
            {(isLoading || isRefetching) && <Spinner size={"lg"} />}
            {!refetchError &&
            refetchSuccess &&
            !isLoading &&
            !isRefetching &&
            underlyingTokens !== undefined &&
            underlyingTokens.length > 0 ? (
              underlyingTokens.map((_, i) => {
                if (underlyingTokens[i] == USDCAddress) {
                  return (
                    <div
                      key={i}
                      className=" text-base font-semibold flex sm:flex-wrap md:flex-wrap items-center justify-between lg:w-[40%] w-[80%] mx-auto"
                    >
                      <span className=" tracking-wider flex sm:flex-wrap md:flex-wrap items-center justify-between">
                        {" "}
                        <Image
                          src="https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-2"
                        />
                        USDC -
                      </span>{" "}
                      <span className="text-lg underline font-medium italic">
                        {tokenRatios[i] != 0
                          ? ethers.formatUnits(tokenRatios[i], "ether") * 100
                          : 0}
                        %
                      </span>
                    </div>
                  );
                }
                if (underlyingTokens[i] == WETHAddress) {
                  return (
                    <div
                      key={i}
                      className=" text-base font-semibold flex sm:flex-wrap md:flex-wrap items-center justify-between lg:w-[40%] w-[80%] mx-auto"
                    >
                      <span className=" tracking-wider flex sm:flex-wrap md:flex-wrap items-center justify-between">
                        <Image
                          src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-2"
                        />
                        WETH -
                      </span>{" "}
                      <span className="text-lg underline font-medium italic">
                        {tokenRatios[i] != 0
                          ? ethers.formatUnits(tokenRatios[i], "ether") * 100
                          : 0}
                        %
                      </span>
                    </div>
                  );
                }
                if (underlyingTokens[i] == WBTCAddress) {
                  return (
                    <div
                      key={i}
                      className=" text-base font-semibold flex sm:flex-wrap md:flex-wrap items-center justify-between lg:w-[40%] w-[80%] mx-auto"
                    >
                      <span className=" tracking-wider flex sm:flex-wrap md:flex-wrap items-center justify-between">
                        <Image
                          src="https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-2"
                        />
                        WBTC -
                      </span>{" "}
                      <span className="text-lg underline font-medium italic">
                        {tokenRatios[i] != 0
                          ? ethers.formatUnits(tokenRatios[i], "ether") * 100
                          : 0}
                        %
                      </span>
                    </div>
                  );
                }
                if (underlyingTokens[i] == MATICAddress) {
                  return (
                    <div
                      key={i}
                      className=" text-base font-semibold flex sm:flex-wrap md:flex-wrap items-center justify-between lg:w-[40%] w-[80%] mx-auto"
                    >
                      <span className=" tracking-wider flex sm:flex-wrap md:flex-wrap items-center justify-between">
                        <Image
                          src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-2"
                        />
                        WMATIC -
                      </span>{" "}
                      <span className="text-lg underline font-medium italic">
                        {tokenRatios[i] != 0
                          ? ethers.formatUnits(tokenRatios[i], "ether") * 100
                          : 0}
                        %
                      </span>
                    </div>
                  );
                }
                if (underlyingTokens[i] == AAVEAddress) {
                  return (
                    <div
                      key={i}
                      className=" text-base font-semibold flex sm:flex-wrap md:flex-wrap items-center justify-between lg:w-[40%] w-[80%] mx-auto"
                    >
                      <span className=" tracking-wider flex sm:flex-wrap md:flex-wrap items-center justify-between">
                        <Image
                          src="https://cryptologos.cc/logos/aave-aave-logo.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-2"
                        />
                        AAVE -
                      </span>{" "}
                      <span className="text-lg underline font-medium italic">
                        {tokenRatios[i] != 0
                          ? ethers.formatUnits(tokenRatios[i], "ether") * 100
                          : 0}
                        %
                      </span>
                    </div>
                  );
                }
              })
            ) : (
              <div
                className="w-[80%] mx-auto bg-orange-100 border-l-4 border-orange-500 text-orange-700 px-4 py-2 rounded-xl text-sm"
                role="alert"
              >
                <p className="font-bold text-left">
                  No Valid Index with this address exists
                </p>
                <p className="text-left">
                  Please verify that the entered address is correct.
                </p>
              </div>
            )}
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Balance
              </Label>
              {isBalanceRefetching ? (
                <Spinner size={"lg"} />
              ) : (
                <span className="text-2xl tracking-widest text-left font-mono text-muted-foreground font-extrabold">
                  {(!isBalanceRefetching &&
                    !balanceRefetchError &&
                    balanceRefetchSuccess &&
                    balance) ||
                    0}{" "}
                  ether
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Token Address
              </Label>
              <Input
                type="text"
                placeholder="Address of Index Token"
                value={tokenAddress}
                className="w-[100%]"
                onChange={async (e) => {
                  setTokenAddress(e.target.value);
                  renderNewPercentages();
                  refetchBalance();
                }}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Redemption Amount
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
          <DialogFooter className="flex sm:flex-col flex-wrap items-stretch">
            <Button
              type="submit"
              disabled={tokenAmount <= 0}
              onClick={async () => {
                getUserIndexTokens();
                issueTokenFromContract();
              }}
            >
              Redeem Tokens
              {issueLoading && (
                <span className="ml-2">
                  <Spinner size={"default"} />
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
