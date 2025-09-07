// src/lib/img-analyze/extractColors.ts

import getColors from 'get-image-colors';

/**
 * sharp로 자른 이미지 버퍼에서 색상 추출
 * @param imageBuffer - sharp로 자른 Buffer
 * @returns string[] - hex 색상 배열
 */
export async function extractColors(imageBuffer: Buffer): Promise<string[]> {
  const colors = await getColors(imageBuffer, { type: 'image/jpeg' });
  return colors.map((color) => color.hex());
}
