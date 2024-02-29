import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const router = useRouter();

  const handleRoute = () => {
    router.push('/Login');
  };


  return (
    <main
      className={`flex min-h-screen font-main overflow-hidden flex-col ${inter.className}`}
    >
     <div className="text-2xl font-bold py-[1%] px-[5%]">
      <h2 className="font-sans text-4xl text-[#4642f0]">mynt</h2>
     </div>
     <div className="p-5 px-[5%]">
     <div className="rounded-3xl p-9 w-[100%] bg-[#4642f0]">
      <div className="w-[80%]">
        <h1 className=" font-main leading-9xl text-[#fbd0ff] font-bold text-8xl">
        The first blockchain based omni-channel solution in loyalty
        </h1>
        <p className="font-main text-white max-w-[70%] text-2xl mt-9">
        Give your customers a connected journey across all of your touch-points with our ecosystem of out-of-the-box integrations.
        </p>
      </div>
      <div className="mt-6 flex gap-4">
        <button onClick={handleRoute} className="bg-[#fbd0ff] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">
           Start now
        </button>
        <button className="border-[#fbd0ff] border-[3px] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">
           Use cases
        </button>
      </div>
     </div>
     </div>
     {/* <section className="h-screen mt-8 w-screen font-main font-bold text-[#4642f0] text-2xl px-[5%]">
      <div className="flex items-center flex-col text-black">
      <h3>Rewarding your customer base has never been easier</h3>
      <p className="font-normal mt-4 text-xl">Mynt uses NFT compression on Solana to help business reward their customers based on realword interaction</p>
      </div>

      <div className="w-full h-full flex justify-center relative bg-[#4538BB] p-5 mt-4 rounded-3xl ">
        <div className="text-[#F8B3FE] pt-6 flex flex-col  h-[30%] items-center absolute z-3">
          <h3 className="text-[4rem]">No matter where they are</h3>
          <h3 className="text-[4rem] mt-8">What ever the time</h3>
        </div>
        <div className="h-full flex justify-center w-full absolute z-1">
        <img className="w-[30%]" src="https://onlinepaymentplatform.com/hubfs/Graphics-1.svg" />
        </div>
        
      </div>
     
     </section>
     <section className="h-screen">

     </section> */}
    </main>
  );
}
