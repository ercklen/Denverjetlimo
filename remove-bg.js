const fs = require('fs');
const Jimp = require('jimp');

const images = [
  'public/fleet_maybach.png',
  'public/fleet_escalade.png',
  'public/fleet_yukon.png',
  'public/fleet_sprinter.png'
];

async function removeWhiteBg() {
  for (const imgPath of images) {
    if (!fs.existsSync(imgPath)) continue;
    console.log('Processing', imgPath);
    const image = await Jimp.read(imgPath);
    
    // Convert near-white to transparent
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      
      // If the pixel is very light (almost white)
      if (red > 230 && green > 230 && blue > 230) {
        // Also check if it's mostly greyscale (no strong colors)
        if (Math.abs(red - green) < 15 && Math.abs(red - blue) < 15) {
          // Set alpha to 0
          this.bitmap.data[idx + 3] = 0;
        }
      }
    });

    await image.writeAsync(imgPath);
    console.log('Saved', imgPath);
  }
}

removeWhiteBg().catch(console.error);
