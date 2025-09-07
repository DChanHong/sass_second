// src/app/api/v1/image-analyze/route.ts

import { cropImage, extractColors } from '@/lib/img-analyze';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imgPath }: { imgPath: string[] } = await request.json();

    if (!imgPath || imgPath.length === 0) {
      return NextResponse.json(
        { result: false, data: null, error: 'imgPath is required' },
        { status: 400 }
      );
    }

    // 한 장만 처리
    const croppedBuffer = await cropImage(imgPath[0]);
    const hexColors = await extractColors(croppedBuffer);

    // Buffer → Base64 → Data URL
    const base64 = croppedBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({
      result: true,
      data: {
        image: dataUrl,
        colors: hexColors,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { result: false, data: null, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
