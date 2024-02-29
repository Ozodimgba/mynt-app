// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'

type Data = {
  error?: any;
  success?: boolean
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { name, symbol, image, description } = req.body

  const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD}` }
  };

const projectData = { 
  "name": name, 
  "symbol": symbol, 
  "image": image, 
  "description": description
};

try {

  const createProjectResponse = await axios.post(
    `${underdogApiEndpoint}/v2/projects`, 
    projectData, 
    config,
  );
  

  res.status(200).json({ success: true });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}
