import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function Id() {
  const [ data, setData] = useState<any>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getCollection', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      "id": id
                  })
                });
                const result = await response.json();
                setData(result.data)
                console.log(result.data); // Log it here
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData(); // Call your async function
    }
}, [id]);
  
const handleRoute = (url: string) => {
    router.replace(url)
  }

  return (
    <main className='h-full  w-full p-5 bg-white font-main'> 
    <div className='w-full h-[25%] grid px-5 grid-cols-10'>
        <div className='h-full w-full flex items-center bg-white'>
        <img src={data?.image} />
        </div>
        <div className='col-span-3 px-3 flex flex-col justify-center gap-2'>
            <h3 className='text-2xl font-bold'>{data?.name}</h3>
            <h3 className='text-xl font-medium'>${data?.symbol}</h3>
            <button className='text-[#4642f0]'>{data?.mintAddress}</button>
        </div>
        <div className='h-full flex justify-end w-full col-span-6'>
            <div className='flex flex-col justify-between'>
                <div className='text-black text-2xl'>
                    <h3>Trigger</h3>
                    <p className='text-lg text-[#00000080]'>Triggers allow you automatically mint nfts based on real world events</p>
                    </div>
                <div className='flex mt-3 gap-4'>
                <button onClick={() => handleRoute(`Time/${id}`)} className="bg-[#4642f0] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">
                 Create Time-Mint +
                </button>  
                <button className="bg-[#4642f0] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">
                 Create Location-Mint +
                </button>  
                </div>
            </div>
        </div>
    </div>
    <div className='mt-5'>
        <div className='flex justify-between items-center'>
            <h3 className='px-5 text-xl text-[#4642f0] font-medium'>Your Receipts</h3>

            <div className='w-[30%] h-[60%] bg-[#00000010] px-3 py-2 rounded-xl'>
                <input className='w-full h-full border-none bg-[#00000000] outline-none' placeholder='Search receipts' />
            </div>
        </div>
        <div className='w-full grid grid-cols-5'>
        {data?.nfts.results.map((res: any) => (
        <div key={res.id} className="bg-white p-5 flex gap-2 flex-col rounded-xl ">
        <img src={res?.image} className='h-[12rem]' />
        <h5 className="text-[#4642f0] text-xl font-bold">{res.name}</h5>
        <button className="bg-[#4642f0] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">Check Info</button>
      </div>
      ))}
        </div>
    </div>
    </main>
  )
}

export default Id