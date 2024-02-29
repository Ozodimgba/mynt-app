// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from 'next/headers'
import { decodeJwt } from "@dynamic-labs/sdk-react-core";


type Data = {
  error: any;
};

type Success = {
    success: any;
  };




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Success>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

   try {

    const { data } = req.body 
    cookies().set('user', data, { maxAge: 3600 })

    res.status(200).json({ success: true });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}
