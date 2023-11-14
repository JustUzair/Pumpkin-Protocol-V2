"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import ERC20_ABI from "../../../constants/ERC20_ABI.json";
import FACTORY_ABI from "../../../constants/FACTORY_ABI.json";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useContractWrite, useNetwork } from "wagmi";
import contractAddresses from "../../../constants/networkMappings.json";
import { Spinner } from "@/components/spinner";
import { toast } from "sonner";
import { Error } from "@/components/error";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgePlus } from "lucide-react";

const COINGECKO_PRICE_FEED_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=weth,aave,wrapped-fantom,dai,usd-coin,tether,binance-usd,wrapped-bitcoin,chainlink,true-usd,wmatic,frax&vs_currencies=usd";

const CreateIndexToken = () => {
  const { chain } = useNetwork();
  const chainId = (chain?.id?.toString() as string) || ("" as string);
  const router = useRouter();
  // console.log("====================================");
  // console.log(chain?.id);
  // console.log("====================================");

  const [isLoaded, setIsLoaded] = useState(false);
  const [usdc, setUsdc] = useState(20);
  const [wbtc, setWbtc] = useState(20);
  const [weth, setWeth] = useState(20);
  const [wmatic, setWmatic] = useState(20);
  const [aave, setAave] = useState(20);

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

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

  const utilityTokenAddress = Array();
  const utilityTokenRatios = Array();

  async function callCreateToken() {
    if (!checkTokenRatio()) return;
    if (weth > 0) {
      utilityTokenAddress.push(WETHAddress);
      utilityTokenRatios.push(weth);
    }
    if (usdc > 0) {
      utilityTokenAddress.push(USDCAddress);
      utilityTokenRatios.push(usdc);
    }
    if (aave > 0) {
      utilityTokenAddress.push(AAVEAddress);
      utilityTokenRatios.push(aave);
    }
    if (wbtc > 0) {
      utilityTokenAddress.push(WBTCAddress);
      utilityTokenRatios.push(wbtc);
    }
    if (wmatic > 0) {
      utilityTokenAddress.push(MATICAddress);
      utilityTokenRatios.push(wmatic);
    }
    if (tokenName.length == 0 || tokenSymbol.length == 0) {
      toast.error("Token Name and Symbol cannot be empty");
      return;
    }
    await write();
    setTokenName("");
    setTokenSymbol("");
  }

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: TokenFactoryAddress as keyof typeof TokenFactoryAddress,
    abi: FACTORY_ABI,
    functionName: "createToken",
    args: [utilityTokenAddress, utilityTokenRatios, tokenName, tokenSymbol],
  });

  if (isSuccess) {
    router.push("/tokens");
  }
  const [coinPriceData, setCoinPriceData] = useState<any>({});
  const [timestamp, setTimestamp] = useState(Date.now());
  //   const [approxTokenPrice, setApproxTokenPrice] = useState(0);

  const checkTokenRatio = () => {
    const sum = usdc + weth + wbtc + wmatic + aave;
    console.log(sum);
    if (sum != 100) {
      toast.error("Token ratios should equal to 100%");
      return false;
    }
    return true;
  };

  // WEB3
  // const createTokenWeb3 = async () => {
  //   await enableWeb3();
  //   await authenticate();
  //   const utilityTokenAddress = [];
  //   const utilityTokenRatios = [];
  //   if (!checkTokenRatio()) return;
  //   if (weth > 0) {
  //     utilityTokenAddress.push(WETHAddress);
  //     utilityTokenRatios.push(weth);
  //   }
  //   if (usdc > 0) {
  //     utilityTokenAddress.push(USDCAddress);
  //     utilityTokenRatios.push(usdc);
  //   }
  //   if (aave > 0) {
  //     utilityTokenAddress.push(AAVEAddress);
  //     utilityTokenRatios.push(aave);
  //   }
  //   if (wbtc > 0) {
  //     utilityTokenAddress.push(WBTCAddress);
  //     utilityTokenRatios.push(wbtc);
  //   }
  //   if (matic > 0) {
  //     utilityTokenAddress.push(WFTMAddress);
  //     utilityTokenRatios.push(matic);
  //   }
  //   if (tokenName.length == 0 || tokenSymbol.length == 0) {
  //     window.alert("Token Name and Symbol cannot be empty");
  //     return;
  //   }

  //   runContractFunction({
  //     params: {
  //       abi: PUMPKIN_ABI,
  //       contractAddress: contractAddress, // specify the networkId
  //       functionName: "createToken",
  //       params: {
  //         _tokens: utilityTokenAddress,
  //         _percentages: utilityTokenRatios,
  //         _name: tokenName,
  //         _symbol: tokenSymbol,
  //       },
  //     },
  //     onError: (error) => {
  //       failureNotification(error.message);
  //       console.log(error);
  //     },
  //     onSuccess: (data) => {
  //       console.log(data);
  //       successNotification(`Index Token Created`);
  //       router.push("/view-tokens");
  //     },
  //   });
  // };

  const calculateIndexTokenPrice = () => {
    const usdcPrice =
      (usdc / 100) *
      parseFloat(
        coinPriceData[tokenSymbolAddress.usdc.id as keyof typeof coinPriceData]
          ?.usd
      );

    const wbtcPrice =
      (wbtc / 100) *
      parseFloat(
        coinPriceData[tokenSymbolAddress.wbtc.id as keyof typeof coinPriceData]
          ?.usd
      );
    const wethPrice =
      (weth / 100) *
      parseFloat(
        coinPriceData[tokenSymbolAddress.weth.id as keyof typeof coinPriceData]
          ?.usd
      );

    const wmaticPrice =
      (wmatic / 100) *
      parseFloat(
        coinPriceData[
          tokenSymbolAddress.wmatic.id as keyof typeof coinPriceData
        ]?.usd
      );
    const aavePrice =
      (aave / 100) *
      parseFloat(
        coinPriceData[tokenSymbolAddress.aave.id as keyof typeof coinPriceData]
          ?.usd
      );

    return (
      usdcPrice +
      wbtcPrice +
      wethPrice +
      wmaticPrice +
      aavePrice
    ).toFixed(2);
  };
  const tokenSymbolAddress = {
    dai: {
      symbol: "dai",
      id: "dai",
    },
    usdc: {
      symbol: "usdc",
      id: "usd-coin",
    },
    usdt: {
      symbol: "usdt",
      id: "tether",
    },
    busd: {
      symbol: "busd",
      id: "binance-usd",
    },
    wbtc: {
      symbol: "wbtc",
      id: "wrapped-bitcoin",
    },
    weth: {
      symbol: "weth",
      id: "weth",
    },
    wmatic: {
      symbol: "wmatic",
      id: "wmatic",
    },
    aave: {
      symbol: "aave",
      id: "aave",
    },
    tusd: {
      symbol: "tusd",
      id: "true-usd",
    },
    frax: {
      symbol: "frax",
      id: "frax",
    },
  };

  function updateTokenState(element: HTMLInputElement) {
    if (element.id == "usdc") {
      setUsdc(parseInt((element as HTMLInputElement)!.value));
    }
    if (element.id == "wbtc") {
      setWbtc(parseInt((element as HTMLInputElement)!.value));
    }
    if (element.id == "weth") {
      setWeth(parseInt((element as HTMLInputElement)!.value));
    }
    if (element.id == "wmatic") {
      setWmatic(parseInt((element as HTMLInputElement)!.value));
    }
    if (element.id == "aave") {
      setAave(parseInt((element as HTMLInputElement)!.value));
    }
  }
  async function getPriceFeedData() {
    try {
      const data = await axios.get(COINGECKO_PRICE_FEED_URL);
      setCoinPriceData(data.data);
      return true;
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  async function handleChange(e: any) {
    if (Date.now() - timestamp > 5000 * 60) {
      console.log("Refreshing Price feeds after 5 minutes");
      await getPriceFeedData();
      setTimestamp(Date.now());
    }
    updateTokenState(e!.target);
  }
  useEffect(() => {
    setIsLoaded(true);
    try {
      axios.get(COINGECKO_PRICE_FEED_URL).then((res) => {
        const data = res.data;
        setCoinPriceData(data);
      });
      //   console.log(coinPriceData);
    } catch (err: any) {
      toast.error(err.message);
    }
  }, []);

  if (isLoaded) {
    return (
      <div className="py-[50px]">
        <div className="backdrop-blur-3xl mx-auto w-[80%] md:[60%] lg:w-[40%] sm:w-[80%] bg-black/5 dark:bg-white/10  py-4 bg-opacity-10 rounded-2xl p-3 text-white border border-white shadow-lg">
          {chainId === undefined ||
          !(chainId in contractAddresses) ||
          !TokenFactoryAddress ? (
            <Error />
          ) : (
            <div className="index-token--container m-4 text-gray-700 dark:text-gray-100">
              <span className="text-center font-poppins font-bold text-3xl break-words tracking-widest underline">
                Create an Index Token
              </span>
              <h6 className="text-sm my-2">
                ✨ Create your own index token. Define its name, the symbol, and
                percentages of each asset.
              </h6>
              <br />

              <div className="token-info--container">
                <span className="text-2xl font-mono font-semibold">
                  Token Info
                </span>

                <div className="index-token ml-5 mt-2 mb-7">
                  <div className="token-label--container">
                    <Label className="token-name--label">Token Name - </Label>
                  </div>

                  <Input
                    required
                    type="text"
                    className="token-name"
                    id="token-name"
                    placeholder="Awesome Index"
                    onChange={(e) => {
                      setTokenName(e.target.value);
                    }}
                  />

                  <div className="token-label--container ">
                    <Label className="token-name--label">Token Symbol - </Label>
                  </div>
                  <div className="token-slider">
                    <Input
                      required
                      type="text"
                      className="token-symbol"
                      id="token-name"
                      placeholder="AWSM"
                      onChange={(e) => {
                        setTokenSymbol(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="slider-values ">
                <span className="text-2xl font-mono font-semibold mb-7">
                  Index Token Percentage
                </span>

                {/* USDC */}
                <div className="underlying-token flex items-center justify-around">
                  <div className="token-label--container">
                    <Label className="token-label flex flex-col items-center justify-center tracking-widest">
                      <Image
                        src="https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png"
                        width={50}
                        height={50}
                        alt="token logo"
                        className="crypto_icon my-1"
                      />
                      USDC
                    </Label>
                  </div>
                  <div className="token-slider w-[70%] max-w-[70%] flex items-center justify-between">
                    <input
                      required
                      type="range"
                      className="depend w-[100%]"
                      min="0"
                      max="100"
                      value={usdc}
                      step="1"
                      onChange={handleChange}
                      id="usdc"
                    />
                    <Label id="usdc_percentage">{usdc}</Label>%
                  </div>
                </div>
                <br />
                {/* WBTC */}
                <div className="underlying-token flex items-center justify-around">
                  <div className="token-label--container">
                    <Label className="token-label flex flex-col items-center justify-center tracking-widest">
                      {" "}
                      <Image
                        src="https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png"
                        width={50}
                        height={50}
                        alt="token logo"
                        className="crypto_icon my-1"
                      />
                      WBTC
                    </Label>
                  </div>
                  <div className="token-slider w-[70%] max-w-[70%] flex items-center justify-between">
                    <input
                      required
                      type="range"
                      className="depend w-[100%]"
                      min="0"
                      max="100"
                      value={wbtc}
                      step="1"
                      onChange={handleChange}
                      id="wbtc"
                    />
                    <Label id="wbtc_percentage">{wbtc}</Label>%
                  </div>
                </div>
                <br />
                {/* WETH */}
                <div className="underlying-token flex items-center justify-around">
                  <div className="token-label--container">
                    <Label className="token-label flex flex-col items-center justify-center tracking-widest">
                      {" "}
                      <Image
                        src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG.png"
                        width={50}
                        height={50}
                        alt="token logo"
                        className="crypto_icon my-1"
                      />
                      WETH
                    </Label>
                  </div>
                  <div className="token-slider w-[70%] max-w-[70%] flex items-center justify-between">
                    <input
                      required
                      type="range"
                      className="depend w-[100%] "
                      min="0"
                      max="100"
                      value={weth}
                      step="1"
                      onChange={handleChange}
                      id="weth"
                    />
                    <Label id="weth_percentage">{weth}</Label>%
                  </div>
                </div>
                <br />
                {/* WMATIC */}
                <div className="underlying-token flex items-center justify-around">
                  <div className="token-label--container">
                    <Label className="token-label flex flex-col items-center justify-center tracking-widest">
                      {" "}
                      <Image
                        src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                        width={50}
                        height={50}
                        alt="token logo"
                        className="crypto_icon my-1"
                      />
                      WMATIC
                    </Label>
                  </div>
                  <div className="token-slider w-[70%] max-w-[70%] flex items-center justify-between">
                    <input
                      required
                      type="range"
                      className="depend w-[100%]"
                      min="0"
                      max="100"
                      value={wmatic}
                      step="1"
                      onChange={handleChange}
                      id="wmatic"
                    />
                    <Label id="wftm_percentage">{wmatic}</Label>%
                  </div>
                </div>
                <br />
                {/* AAVE */}
                <div className="underlying-token flex items-center justify-around">
                  <div className="token-label--container">
                    <Label className="token-label flex flex-col items-center justify-center tracking-widest">
                      {" "}
                      <Image
                        src="https://cryptologos.cc/logos/aave-aave-logo.png"
                        width={50}
                        height={50}
                        alt="token logo"
                        className="crypto_icon my-1"
                      />
                      AAVE
                    </Label>
                  </div>
                  <div className="token-slider w-[70%] max-w-[70%] flex items-center justify-between">
                    <input
                      required
                      type="range"
                      className="depend w-[100%]"
                      min="0"
                      max="100"
                      value={aave}
                      step="1"
                      onChange={handleChange}
                      id="aave"
                    />
                    <Label id="aave_percentage">{aave}</Label>%
                  </div>
                </div>
              </div>
              <br />

              <br />

              <div className="token-price--container">
                <span className="text-2xl font-mono font-semibold mb-7">
                  Token Action
                </span>

                <div className="approx-token-price--container">
                  <div className="underlying-token--price">
                    <div className="token-label--container flex  items-center ml-10">
                      <Label className="">
                        {" "}
                        <Image
                          src="https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-5"
                        />
                      </Label>
                      <span className="text-2xl font-semibold tracking-widest">
                        USDC ~ $
                        <span>
                          {(
                            (usdc / 100) *
                            parseFloat(
                              coinPriceData[tokenSymbolAddress.usdc.id]?.usd
                            )
                          ).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="underlying-token--price">
                    <div className="token-label--container flex items-center ml-10">
                      <Label className="">
                        {" "}
                        <Image
                          src="https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-5"
                        />
                      </Label>
                      <span className="text-2xl font-semibold tracking-widest">
                        WBTC ~ $
                        <span>
                          {(
                            (wbtc / 100) *
                            parseFloat(
                              coinPriceData[tokenSymbolAddress.wbtc.id]?.usd
                            )
                          ).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="underlying-token--price">
                    <div className="token-label--container flex items-center ml-10">
                      <Label className="">
                        {" "}
                        <Image
                          src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-5"
                        />
                      </Label>
                      <span className="text-2xl font-semibold tracking-widest">
                        WETH ~ $
                        <span>
                          {(
                            (weth / 100) *
                            parseFloat(
                              coinPriceData[tokenSymbolAddress.weth.id]?.usd
                            )
                          ).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="underlying-token--price">
                    <div className="token-label--container flex items-center ml-10">
                      <Label className="">
                        {" "}
                        <Image
                          src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-5"
                        />
                      </Label>
                      <span className="text-2xl font-semibold tracking-widest">
                        WMATIC ~ $
                        <span>
                          {(
                            (wmatic / 100) *
                            parseFloat(
                              coinPriceData[tokenSymbolAddress.wmatic.id]?.usd
                            )
                          ).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="underlying-token--price">
                    <div className="token-label--container flex items-center ml-10">
                      <Label className="">
                        {" "}
                        <Image
                          src="https://cryptologos.cc/logos/aave-aave-logo.png"
                          width={50}
                          height={50}
                          alt="token logo"
                          className="crypto_icon my-1 mr-5"
                        />
                      </Label>
                      <span className="text-2xl font-semibold tracking-widest">
                        AAVE ~ $
                        <span>
                          {(
                            (aave / 100) *
                            parseFloat(
                              coinPriceData[tokenSymbolAddress.aave.id]?.usd
                            )
                          ).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <br />
                  <div className="final-price--container text-center text-3xl font-mono font-semibold tracking-wide border-2 rounded-xl border-slate-900 dark:border-gray-400 w-[50%] px-5 py-2 mx-auto">
                    Approx Value in USD ~{" "}
                    <span>${calculateIndexTokenPrice()}</span>
                  </div>
                  <div className="relative">
                    <Button
                      variant={"ghost"}
                      className="lg:w-[50%] md:w-[70%] w-[100%] sm:text-sm absolute translate-y-[20%] translate-x-[-50%] left-[50%] border-2 dark:bg-slate-900 text-white bg-violet-700 border-slate-900 dark:border-white hover:bg-violet-500 dark:hover:bg-slate-700"
                      onClick={callCreateToken}
                    >
                      <BadgePlus className="h-4 w-4" />
                      <span className="ml-3 mr-2"> Create Index Token</span>
                      {isLoading && <Spinner />}
                    </Button>
                    {isSuccess &&
                      toast.success(
                        `Your index token was created successfully`
                      )}
                  </div>
                  <br />
                  <br />
                </div>
              </div>
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default CreateIndexToken;
