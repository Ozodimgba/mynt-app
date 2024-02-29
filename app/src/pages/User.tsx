import React,{ useEffect, useState } from 'react'
import {
    DynamicContextProvider,
    DynamicWidget,
    getAuthToken,
    useDynamicContext
  } from "@dynamic-labs/sdk-react-core";
  import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";

interface Content {
    $schema: string;
    json_uri: string;
    files: File[];
    metadata: Metadata;
    links: Links;
  }
  
  interface File {
    uri: string;
    cdn_uri: string;
    mime: string;
  }
  
  interface Metadata {
    name: string;
    symbol: string;
    token_standard: string;
    // Add more properties as needed 
  }
  
  interface Links {
    external_url: string;
    animation_url: string;
    image: string;
  }
  
  interface Asset { // Renamed from your generic 'interface' for clarity
    interface: string;
    id: string;
    content: Content;
    // Add other properties from your response
  }

  interface AssetProps {
    asset: Asset; 
  }
  

function User() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ balance, setBalance] = useState<number>(0)
    const { user } = useDynamicContext();

  const AssetCard: React.FC<AssetProps> = ({ asset }) => {
    return (
      <div className=" text-black asset-card">
        
        <img className='rounded-md overflow-hidden' src={asset.content.links.image} alt={asset.content.metadata.name} />
        <h2>{asset.content.metadata.name}</h2> 
        {/* Display other asset information as desired */}
      </div>
    );
  };

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
    const url = "https://devnet.helius-rpc.com/?api-key=8a088249-1395-4689-84d6-0d0daa05bd6a"
    const getAssetsByOwner = async () => {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetsByOwner',
            params: {
              ownerAddress: `${user?.verifiedCredentials[0].address}`,
              page: 1, // Starts at 1
              limit: 1000,
            },
          }),
        });
        const { result } = await response.json();
        
        setAssets(result.items)
      };
      getAssetsByOwner(); 
  }, [])

  function formatBalance(balance: number){
    const divide = balance / 1000000000;
    const decimal = divide.toFixed(2)
    return decimal
  }

  return (
    <main className='bg-white relative font-main h-full text-black w-full'>
        <div className='p-5 flex justify-between items-center text-2xl text-black font-bold'>
            <h3>Hi Ife</h3>
            <DynamicWidget />
        </div>
        <div className='w-full px-5 h-[30%]'>
        <h4>Balance</h4>
        <h3 className='font-bold text-3xl'>{formatBalance(balance)}</h3>
        <div className='flex gap-4 mt-4'>
        <button className="bg-[#4642f0] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">
        <FiArrowDownLeft size={30} />
        </button> 
        <button className="bg-[#4642f0] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">
          <FiArrowUpRight size={30} />
        </button> 
        </div>
        </div>
    {isLoading && <div className='loader'>Loading assets...</div>}
    {error && <div className='error-message'>{error}</div>}
    <div className='mt-5'>
    <div className='text-xl px-5 text-black font-bold'>
    <h3>My Receipts</h3>
    </div>
    
    <div className='w-full grid grid-cols-2 p-5 gap-4'>
      {assets?.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
    </div>
    
  </main>
  )
}

export default User