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
import { BadgeDollarSign, HeartHandshake, PlusCircle } from "lucide-react";

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

  const [tokens, setTokens] = useState([]);
  const [tokenNames, setTokenNames] = useState([]);
  const [tokenSymbols, setTokenSymbols] = useState([]);

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
      setTokenNames(data[0]!.result);
      setTokenSymbols(data[1]!.result);
      setTokens(data[2]!.result);
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

  if (isLoaded) {
    return (
      <>
        {chainId === undefined ||
        !(chainId in contractAddresses) ||
        !TokenFactoryAddress ? (
          <Error />
        ) : (
          <div className="tokens-container w-[50%] justify-between lg:grid lg:grid-cols-3 gap-4 md:grid md:grid-cols-2 flex flex-col mx-auto px-5 py-10">
            {tokenNames.map((_, index) => {
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
                        className="mb-2 text-2xl font-bold tracking-widest break-words text-gray-900 dark:text-white"
                        title="Index Token Name"
                      >
                        {tokenNames[index]}
                      </h5>
                      <h5
                        className="text-base text-muted-foreground/70 dark:text-muted-foreground/50 lg:pr-10 sm:pr-3 md:pr-5"
                        title="Index Token Symbol"
                      >
                        {tokenSymbols[index]}
                      </h5>
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
                        <Button className="w-[100%]" variant={"ghost"}>
                          Issue Token{" "}
                          <span className="ml-2">
                            <PlusCircle className="h-4 w-4" />
                          </span>
                        </Button>
                      </div>
                      <div className="my-2 w-[100%]">
                        <Button className="w-[100%]">
                          Redeem Token{" "}
                          <span className="ml-2">
                            <BadgeDollarSign className="h-4 w-4" />
                          </span>
                        </Button>
                      </div>
                      <div className="my-2 w-[100%]">
                        <Button className="w-[100%]">
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
