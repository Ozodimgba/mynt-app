import Image from "next/image";
import { Inter } from "next/font/google";
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import InputCallback from "./components/InputCallback";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Merchant() {
  const [ balance, setBalance] = useState<number>(0)
  const [ collections, setCollections] = useState<[] | null>([])
  const { user } = useDynamicContext();

  const router = useRouter();

  useEffect(() => {
    if (user?.verifiedCredentials[0].address) {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getBalance', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      "publicKey": user?.verifiedCredentials[0].address
                  })
                });
                const result = await response.json();
                setBalance(result.balance);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData(); // Call your async function
    }
}, [user?.verifiedCredentials]);


useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getCollections')
                const result = await response.data
                // setBalance(result.balance);
                // console.log(result.data.results)
                setCollections(result.data.results)
                //console.log(result.data.results); // Log it here
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData(); // Call your async function
}, [collections]);

  const handleRoute = (url: string) => {
    router.push(url)
  }

  function formatBalance(balance: number){
    const divide = balance / 1000000000;
    const decimal = divide.toFixed(2)
    return decimal
  }

  return (
    <main className="text-black font-main flex pb-6 flex-col bg-white h-[100%] w-[100%]">
     <div className="p-6 flex justify-between gap-6">
     <h2 className="font-main font-bold text-2xl">Hi, Boss</h2>
     <DynamicWidget />
     </div>

     <div className="px-5 w-[100%]">
      <div className="w-[100%] p-4 rounded-[2rem] h-[100%] bg-[#332553]">

       <div className="bg-[#4642f0] rounded-[1.2rem] grid grid-cols-10 p-6 h-[50vh]">
        <div className="col-span-4">
        <div><h3 className="font-main font-bold text-xl text-white">Balance</h3></div>
        <div className="mt-3 w-[100%] flex gap-3">
            <div className="bg-white p-3 px-5 pr-[10%] rounded-xl">
                <h4 className="font-bold text-xl">${formatBalance(balance)}</h4>
            </div>
            <div className="bg-[#C7FFA5] flex justify-center items-center px-4 rounded-xl">
                <h4 className="font-medium">4%</h4>
            </div>
        </div>
        <div className="mt-4">
            <h4 className="font-bold text-xl text-white">Average daily mint</h4>
            <span className="font-medium text-white text-xl mt-4">700</span>
        </div>

        <div className="mt-4">
            <h4 className="font-bold text-xl text-white">Collections</h4>
            <span className="font-medium text-white text-xl mt-4">3</span>
        </div>
       </div>

       <div className="bg-white flex flex-col max-h-[100%] justify-between p-4 col-span-6 rounded-lg">

       <div className="text-black">
            <h4 className="font-Medium text-sm ">Mint URL</h4>
            <div className="bg-[#33255330] mt-1 px-5 py-2 rounded-xl">
            <h3 className="font-bold text-[#4642f0]">https://mynt.io/api/mint/{user?.verifiedCredentials[0].address}</h3>
            </div>
        </div>

        <div className="text-black mt-1">
            <h4 className="font-Medium text-sm ">Your Oauth URL</h4>
            <div className="bg-[#33255330] mt-1 px-5 py-2 rounded-xl">
               <h3 className="font-bold text-[#4642f0]">https://mynt.io/G5hZAWCLy4Jyz63knYWzdnFqKGff2KPta1NpKP7aEgHr&user</h3>
            </div>
        </div>

        <div className="text-black mt-1">
            <h4 className="font-Medium text-sm ">Your call back url</h4>
            <div className="bg-[#33255330] font-bold text-[#4642f0] mt-1 pl-0 pr-1 rounded-xl">
               <InputCallback merchantID={`${user?.verifiedCredentials[0].address}`} />
            </div>
        </div>

       </div>
       </div>

       <div className="mt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-2xl">My Collections</h3>
          <button onClick={() => {handleRoute(`${user?.verifiedCredentials[0].address}/createCollection`)}} className="bg-[#fbd0ff] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">Create new collection +</button>
        </div>
       
        <div className="mt-5 flex flex-col gap-5">
        {collections?.map((res: any) => (
        <div key={res.id} className="bg-white h-[6rem] p-5 flex justify-between items-center rounded-xl w-[100%]">
        <h5 className="text-[#4642f0] text-xl font-bold">{res.name}</h5>
        <button onClick={() => handleRoute(`Collection/${res.id}`)} className="border-[#4642f0] border-[3px] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">More info</button>
      </div>
      ))}
      </div>
        

       </div>
      </div>
     </div>
    </main>
  );
}