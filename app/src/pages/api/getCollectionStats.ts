// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'
import {
  Connection,
  PublicKey,
  Signer,
  Transaction,
  sendAndConfirmTransaction,
  SystemProgram,
  Keypair,
  Message,
  clusterApiUrl,
  TransactionInstruction,
} from '@solana/web3.js';
const { Blob } = require('buffer');
import { decode } from "bs58";
import subtract from '../../../public/Subtract.png'
import { signTransactionFromFrontend } from "@/utils/txSigners";


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

  const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD}` }
  };


try {

  const fetchStats = await axios.get(
    `${underdogApiEndpoint}/v2/projects/1/stats`, 
    config
    );
  

  res.status(200).json({ data: fetchStats.data });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}