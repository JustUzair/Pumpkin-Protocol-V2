"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useScrollTop } from "@/hooks/use-scroll";

// import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { Spinner } from "./spinner";
export const Navbar = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex items-center justify-between p-5 sticky top-0 bg-orange-100 dark:bg-black z-[99999]">
      <span
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          src={"/png/logo.png"}
          alt={"Logo"}
          width={"50"}
          height={"50"}
          className="lg:hidden h-[75px] w-[75px]"
        />
        <Image
          src={"/png/logo-text.png"}
          alt={"Logo"}
          width={"100"}
          height={"100"}
          className="hidden lg:block w-[250px] h-[50px] object-contain"
        />
      </span>
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
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={{
            largeScreen: true,
            smallScreen: false,
          }}
          chainStatus={{
            smallScreen: "none",
            largeScreen: "full",
          }}
        />
        <span className="ml-5">
          <ModeToggle />
        </span>
      </div>
    </div>
  );
};
