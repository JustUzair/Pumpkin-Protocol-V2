"use client";

import { Button } from "@/components/ui/button";
import { useNetwork } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import contractAddresses from "../../../../constants/networkMappings.json";
export function MintUtility() {
  const { chain } = useNetwork();

  console.log("====================================");
  console.log(chain);
  console.log("====================================");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="border-2 border-slate-900 dark:border-violet-400 "
        >
          Mint Utility Tokens
        </Button>
      </DialogTrigger>

      {chain === undefined && (
        <DialogContent>
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-xl mt-3"
            role="alert"
          >
            <p className="font-bold">No valid Chain found</p>
            <p>Connect to valid network to get utility tokens.</p>
          </div>
        </DialogContent>
      )}
      {chain !== undefined && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mint Utility Tokens</DialogTitle>
            <DialogDescription>
              Get your underlying test tokens for testing the dApp
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
