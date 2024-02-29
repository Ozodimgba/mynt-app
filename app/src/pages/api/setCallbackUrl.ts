import type { NextApiRequest, NextApiResponse } from "next";
import Redis from 'ioredis';
import axios from 'axios';

// Consider moving these to a shared config file for reusability
const redis = new Redis('rediss://:39eb3f1288804471beb6fc9d58f2e2fd@shining-pig-43602.upstash.io:43602');

const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
const projectId = 1;
const authHeader = { Authorization: `Bearer ${'509d4bf06299bf.230bb5ca35fe494e999658548a496873'}` };

interface MerchantInstance {
  merchantID: string; 
  userID: string;
  publicKey: string; // Include publicKey
}

type Data = {
  error?: any; // Make error optional
  success?: boolean; // Add potential nftData property
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

async function updateCallbackUrl(merchantID: string, callbackUrl: string) {
    const key = 'callbacks';
  
    try {
      // 1. Search for existing entry
      const existingUser = await searchUserByID(merchantID);
  
      // 2. If entry exists, delete it
      if (existingUser) {
        await redis.lrem(key, 1, JSON.stringify(existingUser)); 
      }
  
      // 3. Insert the new data
      const push = { merchantID, callbackUrl };
      await redis.rpush(key, JSON.stringify(push));
  
      // 4. For consistency, you might still want to update your Merchant DB 
      console.log('Merchant DB update logic would go here...');
    } catch (error) {
      console.error('Error updating callback URL:', error);
      throw error; 
    }
  }



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { merchantID, callbackUrl } = req.body;

  if (!merchantID || !callbackUrl) { // Ensure all fields exist
    return res.status(400).json({ error: 'Missing merchantID, userID, or publicKey in query parameters' });
  }

  try {
    // Store in Redis
    const merchantID = req.body.merchantID as string; 
    await updateCallbackUrl(merchantID, callbackUrl)

    // Update Merchant DB (replace with your actual logic)
    console.log('Merchant DB update logic would go here...');
    //fetch callback here
 

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' }); // Consider more specific error handling
  }
}