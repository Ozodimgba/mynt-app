// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'


type Data = {
  error: any;
};

interface Query {
    collectionID: number;
    receiverAddress: string
}




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { collectionID, receiverAddress } = req.body
  const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

  const projectId = 1 || collectionID

  const config = {
    headers: { Authorization: `Bearer ${process}` }
  };

const projectData = { 
  "name": "MYNT Time", 
  "symbol": "TIME", 
  "image": "https://wwovyaerbcdsadifomap.supabase.co/storage/v1/object/public/receipt_metadata/A4%20-%202.png", 
  "receiverAddress": receiverAddress
};

try {

  const createProjectResponse = await axios.post(
    `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`, 
    projectData, 
    config,
  );

  res.status(200).json({ error: createProjectResponse.data });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}