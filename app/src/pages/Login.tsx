import Image from "next/image";
import { Inter } from "next/font/google";
import {
    DynamicContextProvider,
    DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
  
  import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [isMerchant, setMerchant] = useState(false);
  const [isCustomer, setCustomer] = useState(false);

  const handleMerchant = () => {

  }

  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "",
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
    <main className="text-black flex flex-col justify-center items-center bg-white h-screen w-screen">
     <h2 className="font-main font-bold text-3xl">Hi, are you a Merchant or customer?</h2>
     <div className="mt-6 flex gap-6">
     
     { isCustomer ? <DynamicWidget /> : 
     <button onClick={() => setMerchant(!isMerchant)} className="bg-[#4642f0] text-white font-main font-medium px-4 rounded-2xl py-3">
     I am a merchant
     </button> }
     { isMerchant ? <DynamicWidget /> : 
     <button onClick={() => setCustomer(!isCustomer)} className="border-[#4642f0] border-[3px] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">
     I am a customer
     </button> }
     
     </div>
      {/* <DynamicWidget /> */}
    </main>
    </DynamicContextProvider>
  );
}