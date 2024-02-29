import Image from "next/image";
import { Inter } from "next/font/google";
import {
    DynamicContextProvider,
    DynamicWidget,
    getAuthToken,
    useDynamicContext
  } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [isMerchant, setMerchant] = useState(false);
  const [isCustomer, setCustomer] = useState(false);
  const [data, setData] = useState(null);

  const router = useRouter()

  // const { user } = useDynamicContext();
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/createSession', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //             "data": "
  //         })
  //       })
  //       const result = await response.json();
  //       setData(result);
  //       console.log(result)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); 
  // }, []);

  return (

    <main className="text-black flex flex-col justify-center items-center bg-white h-screen w-screen">
     <h2 className="font-main font-bold text-3xl">Hi, are you a Merchant or customer?</h2>
     <div className="mt-6 flex gap-6">
     
     
     <button onClick={() => router.push('Business')} className="bg-[#4642f0] text-white font-main font-medium px-4 rounded-2xl py-3">
     I am a merchant
     </button> 
     
     <button onClick={() => router.push('Consumer')}  className="border-[#4642f0] border-[3px] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">
     I am a customer
     </button>
     
     </div>
      {/* <DynamicWidget /> */}
    </main>
   
  );
}