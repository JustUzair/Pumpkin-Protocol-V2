"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useScrollTop } from "@/hooks/use-scroll";

// import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export const Navbar = () => {
  const scrolled = useScrollTop();
  // const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {}, []);
  // if (!isLoaded) {
  //   <>Loading...</>;
  // }
  // console.log("====================================");
  // console.log(user?.primaryWeb3Wallet?.web3Wallet);
  // console.log("====================================");
  return (
    <div className="flex items-center justify-between p-5 sticky top-0 bg-[#fafafa] dark:bg-black z-[99999]">
      <Image src="/next.svg" alt={"Logo"} width={"50"} height={"50"} />
      <div className="flex items-center justify-around">
        {/* {!!user ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </SignInButton>
        )} */}
        <ConnectButton />
        <span className="ml-5">
          <ModeToggle />
        </span>
      </div>
    </div>
  );
};
