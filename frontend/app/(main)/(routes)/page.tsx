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
      <div className="mx-auto lg:w-[60%] sm:w-[100%]">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <Image
            src={"/about.png"}
            width={100}
            alt="about"
            height={100}
            className="w-[300px]"
          />
          <div className="flex flex-col items-center lg:w-[50%] w-[80%]">
            <span className="font-extrabold space-x-3 text-5xl leading-tight -tracking-wider w-[70%] self-start">
              Cryptocurrencies Unite, Create an Index in sight!
            </span>
            <p className="mt-2 text-xl self-start">
              Easily create your index tokens on the chains with Zk Proofs
            </p>
            <div className="flex items-center justify-between lg:w-[65%] md:w-[40%] sm:w-[100%] mt-10 self-start">
              <Button
                variant="ghost"
                className="border-2 border-slate-900 dark:border-violet-400 mr-2"
                onClick={() => router.push("/tokens/create")}
              >
                Create Now
              </Button>

              <MintUtility />
            </div>
          </div>
        </div>

        <div className="text-center text-gray-800 dark:text-gray-200 mt-20 pb-10">
          <h2 className="font-bold text-3xl ">Popular Index Tokens</h2>
          <div className="flex items-center justify-between px-5 mt-10 flex-col lg:flex-row gap-y-4 ">
            <div className="flex flex-col w-[33%] items-center justify-around">
              <Image
                src="/category1-img.png"
                width={100}
                alt="category"
                height={100}
                className="w-[120px] animate-bounce"
              />
              <span className="text-xl font-semibold">Metaverse Index</span>
              <span className="w-[50%]">
                Composition: APE, ICP, STX, MANA, THETA, AXS, SAND
              </span>
            </div>
            <div className="flex flex-col w-[33%] items-center justify-around">
              <Image
                src="/category2-img.png"
                width={100}
                alt="category"
                height={100}
                className="w-[120px] animate-bounce"
              />
              <span className="text-xl font-semibold">Defi Pulse Index</span>
              <span className="w-[50%]">
                Composition: UNI, LINK, MKR, FXS, SNX, CAKE, CRV, CVX, DYDX,
                YFI, COMP
              </span>
            </div>
            <div className="flex flex-col w-[33%] items-center justify-around">
              <Image
                src="/category3-img.png"
                width={100}
                alt="category"
                height={100}
                className="w-[120px] animate-bounce"
              />
              <span className="text-xl font-semibold">
                Liquid Staking Index
              </span>
              <span className="w-[50%]">
                Composition: STETH, RETH, FRXETH, MSOL, SAVAX, AKRETH
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
