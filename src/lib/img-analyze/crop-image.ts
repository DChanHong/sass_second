import smartcrop from 'smartcrop-sharp';
import sharp from 'sharp';
import axios from 'axios';

export async function cropImage(imgUrl: string): Promise<Buffer> {
  const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);

  const cropResult = await smartcrop.crop(buffer, { width: 120, height: 160 }); // 원하는 비율
  const crop = cropResult.topCrop;

  return sharp(buffer)
    .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
    .toBuffer();
}



