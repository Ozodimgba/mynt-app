import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import path, { join } from "path";
import { createClient } from "@supabase/supabase-js";

type Data = {
  error: any;
};

type Url = {
    url: any;
  };

type BucketResponse = {
    data: {
      path: string;
      id: string;
      fullPath: string;
    };
  };


const supabaseUrl = "https://wwovyaerbcdsadifomap.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3b3Z5YWVyYmNkc2FkaWZvbWFwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwODkzOTI5MCwiZXhwIjoyMDI0NTE1MjkwfQ.FB2bng-DtTaQ8Yxc2OWA_bF9WhuT4wyaV9LksyemyC0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Url>
) {

  const { name, type, duration, reference, amount, symbol} = req.body
  try {

        const canvas = createCanvas(595, 842);
        const context = canvas.getContext("2d");
//value store to get collection folder
//add logic to fetch image url based on org ID and collection
const backgroundImageUrl = "https://wwovyaerbcdsadifomap.supabase.co/storage/v1/object/public/receipt_metadata/A4%20-%201%20(1).png";

// Use loadImage to load the image asynchronously
loadImage(backgroundImageUrl).then(async (backgroundImage) => {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Rest of your code goes here
  const __dirname = path.resolve();
//   GlobalFonts.registerFromPath(
//     join(__dirname, ".", "Suisse-Intl-Mono.ttf"),
//     "DM-Sans"
//   );

try {
    GlobalFonts.registerFromPath(
        join(__dirname, "Suisse-Intl-Mono.ttf"),
        "Suisse"
      );
     // console.log(join(__dirname, "Suisse-Intl-Mono.ttf"))
  } catch (fontError) {
    console.error("Error registering font:", fontError);
  }
  
  //(name, duration, frequency, reference, amount, currency, publicKey)
  context.font = "30px Suisse";
  context.fillStyle = "#4642F0";
  context.fillText(`${name}`, 45, 215);

  context.font = "30px Suisse";
  context.fillStyle = "#4642F0";
  context.fillText(`Type: ${type}`, 45, 286);

  context.font = "30px Suisse";
  context.fillStyle = "#4642F0";
  context.fillText(`Duration: ${duration}`, 45, 353);

  context.font = "30px Suisse";
  context.fillStyle = "#4642F0";
  context.fillText(`Reference: ${reference}`, 45, 425);

  context.font = "30px Suisse";
  context.fillStyle = "#4642F0";
  context.fillText(`Amount: ${amount} ${symbol}`, 45, 494);

  // Convert the canvas to a data URL
  const canvasDataUrl = canvas.toDataURL();
  const base64Data = canvasDataUrl.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");

  // Now you can use the data URL, for example, you can set it as the source of an image element
//   const imgElement = new Image();
//   imgElement.src = canvasDataUrl;
//   document.body.appendChild(imgElement);

const { data, error } = await supabase.storage
.from("receipt_metadata") // Replace with your actual bucket name
.upload(`image-${Date.now()}.png`, buffer);

if (error) {
console.error("Error uploading image to Supabase:", error.message);
} else {
// console.log("Image uploaded successfully. Storage URL:", data.path);
const url = `https://wwovyaerbcdsadifomap.supabase.co/storage/v1/object/public/receipt_metadata/${data.path}`
res.status(200).json({ url: url });
}

   
});   
} catch(err) {
  console.log(err);
  res.status(400).json({ error: err });
} 
  
}