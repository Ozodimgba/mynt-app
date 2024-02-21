import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Merchant() {

  return (
    <main className="text-black font-main flex pb-6 flex-col bg-white h-[100%] w-[100%]">
     <div className="p-6 flex gap-6">
     <h2 className="font-main font-bold text-2xl">Hi, Boss</h2>
     </div>

     <div className="px-5 w-[100%]">
      <div className="w-[100%] p-4 rounded-[2rem] h-[100%] bg-[#332553]">

       <div className="bg-[#4642f0] rounded-[1.2rem] grid grid-cols-10 p-6 h-[50vh]">
        <div className="col-span-4">
        <div><h3 className="font-main font-bold text-xl text-white">Balance</h3></div>
        <div className="mt-3 w-[100%] flex gap-3">
            <div className="bg-white p-3 px-5 pr-[10%] rounded-xl">
                <h4 className="font-bold text-xl">$15,600</h4>
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
            <span className="font-medium text-white text-xl mt-4">4</span>
        </div>
       </div>

       <div className="bg-white flex flex-col justify-between p-4 col-span-6 rounded-lg">

       <div className="text-black">
            <h4 className="font-Medium text-md ">Database URL</h4>
            <div className="bg-[#33255330] mt-2 p-3 px-5 rounded-xl">
               <input className="w-[100%] outline-none bg-[#33255300]"></input>
            </div>
        </div>

        <div className="text-black mt-5">
            <h4 className="font-Medium text-md ">Your URL endpoint</h4>
            <div className="bg-[#33255330] mt-2 p-3 px-5 rounded-xl">
               <input className="w-[100%] outline-none bg-[#33255300]"></input>
            </div>
        </div>

       </div>
       </div>

       <div className="mt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-2xl">My Collections</h3>
          <button className="bg-[#fbd0ff] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">Create new collection +</button>
        </div>

        <div className="mt-5 flex flex-col gap-5">
        <div className="bg-white h-[6rem] p-5 flex justify-between items-center rounded-xl w-[100%]">
          <h5 className="text-[#4642f0] text-xl font-bold">Burger XL size</h5>
          <h3 className="font-medium text-[#4642f0] text-lg">Supply: 4000</h3>
          <button className="border-[#4642f0] border-[3px] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">More info</button>
        </div>
        <div className="bg-white h-[6rem] rounded-xl w-[100%]">
        </div>
        <div className="bg-white h-[6rem] rounded-xl w-[100%]">
        </div>
        <div className="bg-white h-[6rem] rounded-xl w-[100%]">
        </div>
        </div>

       </div>
      </div>
     </div>
    </main>
  );
}