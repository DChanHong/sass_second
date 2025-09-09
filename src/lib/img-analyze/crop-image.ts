import smartcrop from 'smartcrop-sharp';
import sharp from 'sharp';
import axios from 'axios';

export interface CropOptions {
  width?: number;
  height?: number;
  aspectRatio?: number; // 가로세로 비율 (width/height)
  strategy?: 'smart' | 'center' | 'top' | 'bottom' | 'middle';
  minScale?: number; // 최소 크기 비율 (0.1 = 10%)
  maxScale?: number; // 최대 크기 비율 (1.0 = 100%)
  topPadding?: number; // 상단에서 제외할 비율 (0.1 = 10%)
  bottomPadding?: number; // 하단에서 제외할 비율 (0.1 = 10%)
  leftPadding?: number; // 좌측에서 제외할 비율
  rightPadding?: number; // 우측에서 제외할 비율
}

export interface CropResult {
  buffer: Buffer;
  cropInfo: {
    x: number;
    y: number;
    width: number;
    height: number;
    originalWidth: number;
    originalHeight: number;
  };
}

export async function cropImage(imgUrl: string, options: CropOptions = {}): Promise<CropResult> {
  const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);
  
  const image = sharp(buffer);
  const metadata = await image.metadata();
  
  const {
    width = 120,
    height = 160,
    aspectRatio,
    strategy = 'smart',
    minScale = 0.3,
    maxScale = 1.0,
    topPadding = 0,
    bottomPadding = 0,
    leftPadding = 0,
    rightPadding = 0
  } = options;

  let finalWidth = width;
  let finalHeight = height;
  
  // 비율이 지정된 경우 높이를 자동 계산
  if (aspectRatio) {
    finalWidth = width;
    finalHeight = Math.round(width / aspectRatio);
  }

  // 이미지 크기 제한 적용
  const maxWidth = Math.floor((metadata.width || 0) * maxScale);
  const maxHeight = Math.floor((metadata.height || 0) * maxScale);
  const minWidth = Math.floor((metadata.width || 0) * minScale);
  const minHeight = Math.floor((metadata.height || 0) * minScale);

  finalWidth = Math.min(Math.max(finalWidth, minWidth), maxWidth);
  finalHeight = Math.min(Math.max(finalHeight, minHeight), maxHeight);

  // 패딩을 적용한 크롭 영역 계산
  const imgWidth = metadata.width || 0;
  const imgHeight = metadata.height || 0;
  
  const availableWidth = imgWidth - (imgWidth * leftPadding) - (imgWidth * rightPadding);
  const availableHeight = imgHeight - (imgHeight * topPadding) - (imgHeight * bottomPadding);
  const paddingLeft = Math.floor(imgWidth * leftPadding);
  const paddingTop = Math.floor(imgHeight * topPadding);

  let cropResult;
  
  if (strategy === 'smart') {
    // 패딩 영역을 제외하고 스마트 크롭 적용
    const paddedBuffer = await sharp(buffer)
      .extract({
        left: paddingLeft,
        top: paddingTop,
        width: Math.floor(availableWidth),
        height: Math.floor(availableHeight)
      })
      .toBuffer();

    const smartCropResult = await smartcrop.crop(paddedBuffer, { 
      width: finalWidth, 
      height: finalHeight,
      boost: [
        // 상품 이미지는 보통 중앙에 위치하므로 중앙 부분에 가중치
        { x: 0.2, y: 0.2, width: 0.6, height: 0.6, weight: 1.0 }
      ]
    });
    
    // 패딩 오프셋을 다시 추가
    cropResult = {
      topCrop: {
        x: smartCropResult.topCrop.x + paddingLeft,
        y: smartCropResult.topCrop.y + paddingTop,
        width: smartCropResult.topCrop.width,
        height: smartCropResult.topCrop.height
      }
    };
  } else {
    // 다른 전략들은 직접 구현
    let x = 0, y = 0;
    
    switch (strategy) {
      case 'center':
        x = Math.max(paddingLeft, Math.floor(paddingLeft + (availableWidth - finalWidth) / 2));
        y = Math.max(paddingTop, Math.floor(paddingTop + (availableHeight - finalHeight) / 2));
        break;
      case 'middle':
        // 쿠팡 이미지에 최적화: 상단/하단 패딩을 적용하고 중앙 크롭
        x = Math.max(paddingLeft, Math.floor(paddingLeft + (availableWidth - finalWidth) / 2));
        y = Math.max(paddingTop, Math.floor(paddingTop + (availableHeight - finalHeight) / 2));
        break;
      case 'top':
        x = Math.max(paddingLeft, Math.floor(paddingLeft + (availableWidth - finalWidth) / 2));
        y = paddingTop;
        break;
      case 'bottom':
        x = Math.max(paddingLeft, Math.floor(paddingLeft + (availableWidth - finalWidth) / 2));
        y = Math.max(paddingTop, Math.floor(paddingTop + availableHeight - finalHeight));
        break;
    }
    
    cropResult = {
      topCrop: { x, y, width: finalWidth, height: finalHeight }
    };
  }

  const crop = cropResult.topCrop;

  const croppedBuffer = await sharp(buffer)
    .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
    .toBuffer();

  return {
    buffer: croppedBuffer,
    cropInfo: {
      x: crop.x,
      y: crop.y,
      width: crop.width,
      height: crop.height,
      originalWidth: metadata.width || 0,
      originalHeight: metadata.height || 0,
    }
  };
}

// 여러 옵션으로 테스트할 수 있는 함수
export async function cropImageWithMultipleOptions(
  imgUrl: string, 
  optionsArray: CropOptions[]
): Promise<CropResult[]> {
  const results: CropResult[] = [];
  
  for (const options of optionsArray) {
    try {
      const result = await cropImage(imgUrl, options);
      results.push(result);
    } catch (error) {
      console.error('Crop failed with options:', options, error);
    }
  }
  
  return results;
}



