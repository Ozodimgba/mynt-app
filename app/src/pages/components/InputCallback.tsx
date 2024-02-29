import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or your preferred fetch library

interface CallbackUrlProps {
    merchantID: string;
}

const InputCallback: React.FC<CallbackUrlProps> = ({ merchantID }) => {
  const [callbackUrl, setCallbackUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const fetchCallbackUrl = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/getCallbackUrl?merchantID=${merchantID}`);
        
        setCallbackUrl(response.data.data.callbackUrl);
      } catch (error) {
        console.error('Error fetching callback URL:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCallbackUrl();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCallbackUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log({ merchantID, callbackUrl })
    if(merchantID && callbackUrl){
        try {
            await axios.post('/api/setCallbackUrl', { merchantID, callbackUrl });
            // Display a success message or handle success behavior
            console.log('Callback URL updated successfully');
          } catch (error) {
            console.error('Error updating callback URL:', error);
          } finally {
            setIsLoading(false);
          }
    } else {
        console.log('Merchant or callbackUrl is undefind')
    }
    
  };

  return (
    <div className="mt-1">
      <div className="mt-1 pl-2 rounded-xl">
        <form className='flex justify-between' onSubmit={handleSubmit}>
          <input
            type="text"
            value={callbackUrl}
            onChange={handleInputChange}
            placeholder={isLoading ? 'Loading...' : callbackUrl}
            disabled={isLoading}
            className="w-full border-none bg-transparent outline-none"
          />
          <button className='bg-[#4642f0] rounded-lg my-1 text-white px-3 flex-1' type="submit" disabled={isLoading}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputCallback;
