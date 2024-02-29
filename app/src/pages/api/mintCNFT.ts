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
  error?: any;
  data?: any;
};




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { address } = req.body;

  const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

  const projectId = 2

  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD}` }
  };

const projectData = { 
  "name": "MYNT", 
  "symbol": "MYNT", 
  "image": "https://wwovyaerbcdsadifomap.supabase.co/storage/v1/object/public/receipt_metadata/A4%20-%202.png",
  "address": address 
};

try {

  const createProjectResponse = await axios.post(
    `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`, 
    projectData, 
    config,
  );
  
  const nftData = { 
    "name": "Underdog #1", 
    "symbol": "UP", 
    "image": "https://i.imgur.com/Wch6qLE.png", 
  };

  res.status(200).json({ data: createProjectResponse.data });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}
