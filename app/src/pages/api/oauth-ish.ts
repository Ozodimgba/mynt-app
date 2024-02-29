import type { NextApiRequest, NextApiResponse } from "next";
import Redis from 'ioredis';
import axios from 'axios';

// Consider moving these to a shared config file for reusability
const redis = new Redis('rediss://:39eb3f1288804471beb6fc9d58f2e2fd@shining-pig-43602.upstash.io:43602');

const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
const projectId = 1;
const authHeader = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD}` };

interface MerchantInstance {
  merchantID: string; 
  userID: string;
  publicKey: string; // Include publicKey
}

type Data = {
  error?: any; // Make error optional
  url?: any; // Add potential nftData property
};



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { merchantID, userID, publicKey } = req.body;

  if (!merchantID || !userID || !publicKey) { // Ensure all fields exist
    return res.status(400).json({ error: 'Missing merchantID, userID, or publicKey in query parameters' });
  }

  try {
    // Store in Redis
    const merchantID = req.body.merchantID as string; 
    const push = { userID, publicKey };
    console.log(merchantID)
    await redis.rpush(merchantID, JSON.stringify(push));

    // Update Merchant DB (replace with your actual logic)
    console.log('Merchant DB update logic would go here...');
    //fetch callback here
     const response = axios.get(`https://3000-ozodimgba-myntapp-4979bymbxy4.ws-eu108.gitpod.io/api/getCallbackUrl?merchantID=${merchantID}`)
    const callbackUrl = (await response).data.data.callbackUrl

    res.status(200).json({ url: callbackUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' }); // Consider more specific error handling
  }
}
