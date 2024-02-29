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
  data?: any; // Add potential nftData property
};

async function searchUserByID(userID: any) {
    const key = 'callbacks'
    try {
      // Retrieve the list of users from Redis
      const userList = await redis.lrange(key, 0, -1);
  
      // Iterate through the list to find the user with the matching email
      for (const userString of userList) {
        const user = JSON.parse(userString);
        if (user.merchantID === userID) {
          return user; // Found the user with the matching email
        }
      }
  
      // User not found
      return null;
    } catch (error) {
      console.error('Error searching for user by email:', error);
      throw error;
    }
  }


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { merchantID } = req.query;

 
  if (!merchantID) { // Ensure all fields exist
    return res.status(400).json({ error: 'Missing merchantID, userID, or publicKey in query parameters' });
  }

  try {
    // get from Redis
    console.log(await searchUserByID(merchantID))
    const callbackUrl = await searchUserByID(merchantID)

    // //returns the publicKey
    // console.log(publicKey);
    

    res.status(200).json({ data: callbackUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' }); // Consider more specific error handling
  }
}