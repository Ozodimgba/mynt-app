import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col ${inter.className}`}
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
        <button className="bg-[#fbd0ff] text-[#4642f0] font-main font-medium px-4 rounded-2xl py-3">
           Start now
        </button>
        <button className="border-[#fbd0ff] border-[3px] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">
           Use cases
        </button>
      </div>
     </div>
     </div>
    </main>
  );
}
