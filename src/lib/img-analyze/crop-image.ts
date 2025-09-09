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

  // 최종 크기가 사용 가능 영역을 넘지 않도록 보정
  const adjustedWidth = Math.min(finalWidth, Math.floor(availableWidth));
  const adjustedHeight = Math.min(finalHeight, Math.floor(availableHeight));

  // smart, middle 은 center 로 동작하도록 매핑
  const normalizedStrategy = ((): 'center' | 'top' | 'bottom' => {
    if (strategy === 'top') return 'top';
    if (strategy === 'bottom') return 'bottom';
    return 'center';
  })();

  // 좌표 계산 (패딩 내부에서만 위치하도록)
  const minX = paddingLeft;
  const maxX = paddingLeft + Math.floor(availableWidth) - adjustedWidth;
  const minY = paddingTop;
  const maxY = paddingTop + Math.floor(availableHeight) - adjustedHeight;

  let x = minX;
  let y = minY;

  switch (normalizedStrategy) {
    case 'center':
      x = Math.max(minX, Math.floor(paddingLeft + (availableWidth - adjustedWidth) / 2));
      y = Math.max(minY, Math.floor(paddingTop + (availableHeight - adjustedHeight) / 2));
      break;
    case 'top':
      x = Math.max(minX, Math.floor(paddingLeft + (availableWidth - adjustedWidth) / 2));
      y = minY;
      break;
    case 'bottom':
      x = Math.max(minX, Math.floor(paddingLeft + (availableWidth - adjustedWidth) / 2));
      y = Math.max(minY, maxY);
      break;
  }

  // 경계 보정
  x = Math.min(Math.max(x, minX), Math.max(minX, maxX));
  y = Math.min(Math.max(y, minY), Math.max(minY, maxY));

  const croppedBuffer = await sharp(buffer)
    .extract({ width: adjustedWidth, height: adjustedHeight, left: x, top: y })
    .toBuffer();

  return {
    buffer: croppedBuffer,
    cropInfo: {
      x,
      y,
      width: adjustedWidth,
      height: adjustedHeight,
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



