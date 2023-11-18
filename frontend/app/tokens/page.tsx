// @ts-nocheck
"use client";
import contractAddresses from "../../constants/networkMappings.json";
import ERC20_ABI from "../../constants/ERC20_ABI.json";
import FACTORY_ABI from "../../constants/FACTORY_ABI.json";
import {
  useContractWrite,
  useNetwork,
  useAccount,
  useContractReads,
} from "wagmi";
import { Error } from "@/components/error";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  BadgeDollarSign,
  Check,
  Copy,
  Forward,
  Globe,
  HeartHandshake,
  PlusCircle,
  Send,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { IssueTokens } from "./[token-actions]/_components/issue-tokens";

import { RedeemTokens } from "./[token-actions]/_components/redeem-tokens";
const Tokens = function () {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const chainId = (chain?.id?.toString() as string) || ("" as string);
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenNames, setTokenNames] = useState<any[]>([]);
  const [tokenSymbols, setTokenSymbols] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [showIssueTokenModal, setShowIssueTokenModal] =
    useState<boolean>(false);
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
    ],
  });

  async function getUserIndexTokens() {
    if (data !== undefined) {
      setTokenNames(data[0].result);
      setTokenSymbols(data[1].result);
      setTokens(data[2].result);
    }
  }

  useEffect(() => {
    getUserIndexTokens();
  }, [address]);

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  if (!isLoaded) {
    return (
      <div className="min-h-screen min-w-full mx-auto absolute top-[50%] left-[50%]">
        <Spinner size={"lg"} />
      </div>
    );
  }
  const onCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    toast.success("Token address copied to clipboard!");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  if (isLoaded) {
    return (
      <>
        {chainId === undefined ||
        !(chainId in contractAddresses) ||
        !TokenFactoryAddress ? (
          <Error />
        ) : (
          <div className="tokens-container lg:w-[60%] justify-between md:w-[70%] sm:w-[80%] lg:grid lg:grid-cols-3 gap-4 md:grid md:grid-cols-2 flex flex-col mx-auto px-5 py-10">
            {tokenNames.map((_, index) => {
              if (isFetching) {
                return (
                  <div className="w-[12em] max-w-[15em] h-[30vh]" key={index}>
                    <div className="flex items-center justify-center w-[100%] h-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <Spinner size={"lg"} />
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className="max-w-[15em] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <Image
                    className="rounded-t-lg object-fill w-[100%]"
                    src="/polygon.jpeg"
                    alt="Polygon"
                    height={100}
                    width={100}
                  />

                  <div className="p-5">
                    <div className="token-info flex justify-between items-center flex-wrap">
                      <h5
                        className="truncate mb-2 lg:text-2xl md:text-xl block text-base font-bold tracking-widest break-words text-gray-900 dark:text-white"
                        title={`Index Token Name :  ${tokenNames[index]}`}
                      >
                        {tokenNames[index]}
                      </h5>
                      <span className=" lg:pr-10 sm:pr-3 md:pr-5">
                        <h5
                          className="text-base text-muted-foreground/70 dark:text-muted-foreground/90"
                          title="Index Token Symbol"
                        >
                          <span className="flex items-center ">
                            {tokenSymbols[index]}

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  size="icon"
                                  variant={"ghost"}
                                  className="bg-transparent hover:bg-transparent"
                                >
                                  <Forward className="h-5 w-5 text-blue-400 dark:text-orange-400 cursor-pointer ml-2" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-72"
                                align="end"
                                alignOffset={8}
                                forceMount
                              >
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center gap-x-2">
                                    <Globe className=" text-sky-500 animate-pulse h-8 w-8" />
                                    <p className="text-xs font-medium text-sky-500">
                                      Share this token address with your friends
                                      to allow them to issue one for themselves
                                    </p>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      value={tokens[index]}
                                      className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                      disabled
                                    />
                                    <Button
                                      onClick={() => {
                                        onCopy(tokens[index]);
                                      }}
                                      disabled={copied}
                                      className="h-8 rounded-l-none"
                                    >
                                      {copied ? (
                                        <Check className="h-4 w-4" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </h5>
                      </span>
                    </div>
                    <p
                      className="group:invisble mb-3 font-normal truncate cursor-copy"
                      title={tokens[index]}
                      onClick={() => {
                        navigator.clipboard.writeText(`${tokens[index]}`);
                        toast.info("Index Token address copied to clipboard");
                      }}
                    >
                      {tokens[index]}
                    </p>

                    <div className="actions-container flex flex-col py-3 px-2">
                      <div className="my-2 w-[100%]">
                        <IssueTokens
                          defaultTokenAddress={tokens[index]}
                        ></IssueTokens>
                      </div>
                      <div className="my-2 w-[100%]">
                        <RedeemTokens defaultTokenAddress={tokens[index]} />
                      </div>
                      <div className="my-2 w-[100%]">
                        <Button className="w-[100%] border-2 dark:bg-slate-900 text-white bg-violet-700 border-slate-900 dark:border-white hover:bg-violet-500 dark:hover:bg-slate-800">
                          Claim Fee{" "}
                          <span className="ml-2">
                            <HeartHandshake className="h-4 w-4" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
};

export default Tokens;
