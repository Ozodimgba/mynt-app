// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'


type Data = {
  error?: any;
  data?: any
};




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    const { name, type, duration, reference, amount, symbol, receiverAddress, collectionId} = req.body
  const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

  const projectId = collectionId | 1

  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD}` }
  };

  const ImageData = {
    "name": name,
    "type": type,
    "duration": duration,
    "reference": reference,
    "amount": amount,
    "symbol": symbol
  }

  async function mintReceipt(image: string) {

    const projectData = { 
        "name": name, 
        "symbol": "RECEIPT", 
        "image": image, 
        "receiverAddress": receiverAddress
      };
        const createProjectResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`, 
            projectData, 
            config,
          );
    }



try {
  
  axios.post('https://3000-ozodimgba-myntapp-4979bymbxy4.ws-eu108.gitpod.io/api/getImage', ImageData)
  .then(response => {
    // Handle successful response
    //set toast
    console.log(response.data); 
    
    if(response.data.url){
        try {
            const image = response.data.url
            mintReceipt(image)
            res.status(200).json({ data: 'success' })
        } catch(err) {
            res.status(400).json({ error: err });
        }
        
    }
    
  })
  .catch(error => {
   // Handle error
   console.error(error);
   });
  
  const nftData = { 
    "name": "Underdog #1", 
    "symbol": "UP", 
    "image": "https://i.imgur.com/Wch6qLE.png", 
  };

//   res.status(200).json({ error: createProjectResponse.data });

} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}
