import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import path, { join } from "path";

(async() => {

    const canvas = createCanvas(1500, 1500);
const context = canvas.getContext("2d");

// Replace "https://your-public-image-url.com/image.png" with the actual URL of your public image
const backgroundImageUrl = "https://wwovyaerbcdsadifomap.supabase.co/storage/v1/object/public/receipt_metadata/A4%20-%201%20(1).png";

// Use loadImage to load the image asynchronously
loadImage(backgroundImageUrl).then((backgroundImage) => {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Rest of your code goes here
  const __dirname = path.resolve();
  GlobalFonts.registerFromPath(
    join(__dirname, ".", "GeneralSans-Bold.ttf"),
    "DM-Sans"
  );
  GlobalFonts.registerFromPath(
    join(__dirname, ".", "NotoSans-Bold.ttf"),
    "Noto-Sans"
  );

  context.font = "40px Noto-Sans";
  context.fillStyle = "#ffffff";
  context.fillText(`Test`, 115, 1280);
});

console.log(await canvas.encode("png"), {
    name: "image.png",
  })

})();


