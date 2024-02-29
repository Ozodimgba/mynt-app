import React from 'react';
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { useRouter } from 'next/router';
import axios from 'axios'

function Verify() {
  const router = useRouter();
  const { merchantID, userID } = router.query;
  const { user } = useDynamicContext();

  const handleButtonClick = async () => {
    try {
      if (user?.verifiedCredentials[0]?.address) {
       
        const config = {
          "publicKey": user.verifiedCredentials[0].address,
          "userID": userID,
          "merchantID": merchantID
        }
        const response = await axios.post('/api/oauth-ish', config)
        const result = await response.data;
        
        if (result.url) { // Assuming your response contains the URL as a 'url' property
          router.push(result.url); // Redirect the user
        } else {
          console.error('Response does not contain a valid URL');
        }
      } else {
        console.error('User not verified or address not available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <main className='h-screen w-screen flex flex-col  items-center bg-white font-main'>
      <div className='h-[10%] w-full flex p-5 justify-end'>
      <DynamicWidget />
      </div>
      
      <div className='h-full w-full flex flex-col items-center justify-center'>
      <h2 className="font-main font-bold text-center py-5 text-2xl">This business is requesting your wallet address</h2>
      <button onClick={handleButtonClick} className="bg-[#4642f0] text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3">
           Give this website my publickey
        </button>
      </div>
    </main>
  );
}

export default Verify;


