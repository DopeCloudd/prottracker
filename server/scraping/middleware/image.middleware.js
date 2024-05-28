const Jimp = require("jimp");
const axios = require("axios");

async function downloadImage(url) {
  const response = await axios({
    url,
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data, "binary");
}

async function processImage(url) {
  const imageBuffer = await downloadImage(url);

  const image = await Jimp.read(imageBuffer);
  image.scan(
    0,
    0,
    image.bitmap.width,
    image.bitmap.height,
    function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0;
      }
    }
  );

  const processedBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
  return processedBuffer;
}

module.exports = processImage;
