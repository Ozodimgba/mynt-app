// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'




type Data = {
  error: any;
};




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD}` }
  };

  const projectId = 1

 try {

  const getCollectioncNFTs = await axios.get(
    `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`,
    config,
  );
  
  
  res.status(200).json({ error: getCollectioncNFTs.data });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}