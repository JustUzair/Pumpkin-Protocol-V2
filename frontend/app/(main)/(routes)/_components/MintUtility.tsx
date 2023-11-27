"use client";

import { Button } from "@/components/ui/button";
import { useContractWrite, useNetwork } from "wagmi";
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
import { toast } from "sonner";

import { useEffect } from "react";
import { Spinner } from "@/components/spinner";

export function MintUtility() {
  const { chain } = useNetwork();
  const chainId = (chain?.id?.toString() as string) || ("" as string);
  // console.log("====================================");
  // console.log(chain?.id);
  // console.log("====================================");

  useEffect(() => {}, []);
  const MintAllUtliityAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses][
          "MintAllUtliity"
        ][
          contractAddresses[chainId as keyof typeof contractAddresses][
            "MintAllUtliity"
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

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: MintAllUtliityAddress as keyof typeof MintAllUtliityAddress,
    abi: mintAllUtilityAbi,
    functionName: "mintAllTokens",
  });
  if (isSuccess) toast.success("Test Tokens minted successfully!");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="border-2 border-slate-900 dark:border-orange-400 "
        >
          Mint Utility Tokens
        </Button>
      </DialogTrigger>

      {chain === undefined ||
      !(chainId in contractAddresses) ||
      !MintAllUtliityAddress ? (
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
            <DialogTitle>Mint Utility Tokens</DialogTitle>
            <DialogDescription>
              Get your underlying test tokens for testing the dApp
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                USDC
              </Label>
              <Label htmlFor="name" className="text-left">
                <span className="truncate text-muted-foreground text-xs">
                  {USDCAddress}
                </span>
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                WETH
              </Label>
              <Label htmlFor="name" className="text-left">
                <span className="truncate text-muted-foreground text-xs">
                  {WETHAddress}
                </span>
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                WBTC
              </Label>
              <Label htmlFor="name" className="text-left">
                <span className="truncate text-muted-foreground text-xs">
                  {WBTCAddress}
                </span>
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                MATIC
              </Label>
              <Label htmlFor="name" className="text-left">
                <span className="truncate text-muted-foreground text-xs">
                  {MATICAddress}
                </span>
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                AAVE
              </Label>
              <Label htmlFor="name" className="text-left">
                <span className="truncate text-muted-foreground text-xs">
                  {AAVEAddress}
                </span>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                write();
              }}
            >
              Mint Now
              {isLoading && (
                <span className="ml-2">
                  <Spinner />
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
