"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MintUtility } from "./_components/MintUtility";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [mintUtility, setMintUtility] = useState(false);
  return (
    <>
      <div className="mx-auto lg:w-[70%] sm:w-[100%]">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <Image
            src={"/png/landing-2.png"}
            width={100}
            alt="about"
            height={100}
            className="w-[100%] lg:w-[65%] "
          />
          <div className="flex flex-col items-center lg:w-[35%] w-[80%]">
            <span className="font-extrabold space-x-3 text-5xl leading-tight -tracking-wider w-[70%] self-start">
              Cryptocurrencies Unite, Create an Index in sight!
            </span>
            <p className="mt-2 text-xl self-start">
              Easily create your index tokens on the chains with Zk Proofs
            </p>
            <div className="flex items-center justify-between lg:w-[65%] md:w-[40%] sm:w-[100%] mt-10 self-start">
              <Button
                variant="ghost"
                className="border-2 border-slate-900 dark:border-orange-400 mr-2"
                onClick={() => router.push("/tokens/create")}
              >
                Create Now
              </Button>

              <MintUtility />
            </div>
          </div>
        </div>

        <div className="text-center text-gray-800 dark:text-gray-200 mt-20 pb-10">
          <div className="flex w-[50%] items-center justify-around mx-auto">
            <h2 className="font-bold text-3xl justify-self-end">
              Popular Index Tokens
            </h2>
            <Button
              size={"sm"}
              onClick={() => {
                router.push("/tokens");
              }}
            >
              View All Indexes
            </Button>
          </div>
          <div className="flex items-center justify-between px-5 mt-10 flex-col lg:flex-row gap-y-4 ">
            <div className="flex flex-col w-[33%] items-center justify-around">
              <Image
                src="/tokens/scifi_index.png"
                width={100}
                alt="category"
                height={100}
                className="w-[120px] animate-bounce mb-5"
              />
              <span className="text-xl font-semibold">SCIFI Index</span>
              <span className="w-[50%]">
                Composition: SUSHI, DIA, FTT, PERP
              </span>
            </div>
            <div className="flex flex-col w-[33%] items-center justify-around">
              <Image
                src="/tokens/dpi.svg"
                width={100}
                alt="category"
                height={100}
                className="w-[120px] animate-bounce mb-5"
              />
              <span className="text-xl font-semibold">Defi Pulse Index</span>
              <span className="w-[50%]">
                Composition: UNI, LINK, MKR, FXS, SNX, CAKE, CRV, CVX, DYDX,
                YFI, COMP
              </span>
            </div>
            <div className="flex flex-col w-[33%] items-center justify-around">
              <Image
                src="/tokens/nfti.svg"
                width={100}
                alt="category"
                height={100}
                className="w-[120px] animate-bounce mb-5"
              />
              <span className="text-xl font-semibold">NFT Index</span>
              <span className="w-[50%]">
                Composition: MANA, ENJ, SAND, MATIC, WAXE
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
