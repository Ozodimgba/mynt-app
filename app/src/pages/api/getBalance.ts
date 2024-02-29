import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  balance: number;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    const { publicKey } = req.body;

    if (!publicKey) {
      return res.status(400).json({ error: 'publicKey parameter is missing' });
    }

    // Fetch price and balance concurrently
    const [priceResponse, balanceResponse] = await Promise.all([
      axios.get('https://price.jup.ag/v4/price?ids=SOL&vsToken=USDC'),
      axios.get(`https://api-devnet.helius.xyz/v0/addresses/${publicKey}/balances?api-key=${process.env.NEXT_PUBLIC_HL}`),
    ]);

    const priceData = priceResponse.data;
    const balanceData = balanceResponse.data;

    // Data validation 
    if (!priceData || !priceData.data || !priceData.data.SOL || !priceData.data.SOL.price  || !balanceData.nativeBalance) {
      return res.status(500).json({ error: 'Invalid data received from APIs' });
    }

    const valueUSDC = priceData.data.SOL.price;
    const howMany = balanceData.nativeBalance; 
    const balance = valueUSDC * howMany;

    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
