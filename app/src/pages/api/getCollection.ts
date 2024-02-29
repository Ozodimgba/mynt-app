// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'


type Data = {
  data: any;
};

type Error = {
  error: any;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Collection Id parameter is missing' });
  }

  const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD}` }
  };

try {

  const getCollection = await axios.get(
    `${underdogApiEndpoint}/v2/projects/${id}`,
    config,
  );
  
  res.status(200).json({ data: getCollection.data });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
}