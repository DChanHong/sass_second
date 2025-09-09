// src/app/api/v1/image-analyze/route.ts

import { cropImage, cropImageWithMultipleOptions, extractColors, CropOptions } from '@/lib/img-analyze';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      imgPath, 
      testMode = false, 
      cropOptions 
    }: { 
      imgPath: string[]; 
      testMode?: boolean;
      cropOptions?: CropOptions;
    } = await request.json();

    if (!imgPath || imgPath.length === 0) {
      return NextResponse.json(
        { result: false, data: null, error: 'imgPath is required' },
        { status: 400 }
      );
    }

    if (testMode) {
      // 테스트 모드: 다양한 옵션으로 크롭해서 결과 비교
      const testOptions: CropOptions[] = [
        // 기본 설정 (사용자가 선택한 최적 설정)
        { width: 120, height: 160, strategy: 'smart' },
        
        // 상단/하단을 조금씩 자르는 옵션들
        { width: 120, height: 160, strategy: 'smart', topPadding: 0.1, bottomPadding: 0.1 },
        { width: 120, height: 160, strategy: 'smart', topPadding: 0.15, bottomPadding: 0.15 },
        { width: 120, height: 160, strategy: 'smart', topPadding: 0.2, bottomPadding: 0.1 },
        
        // 중앙 크롭 + 패딩
        { width: 120, height: 160, strategy: 'middle', topPadding: 0.1, bottomPadding: 0.1 },
        { width: 120, height: 160, strategy: 'middle', topPadding: 0.15, bottomPadding: 0.15 },
        
        // 상단을 더 많이 자르는 옵션 (쿠팡 로고/텍스트 제거)
        { width: 120, height: 160, strategy: 'smart', topPadding: 0.25, bottomPadding: 0.1 },
        { width: 120, height: 160, strategy: 'middle', topPadding: 0.25, bottomPadding: 0.1 },
        
        // 하단을 더 많이 자르는 옵션 (가격/버튼 제거)
        { width: 120, height: 160, strategy: 'smart', topPadding: 0.1, bottomPadding: 0.25 },
      ];

      const results = await cropImageWithMultipleOptions(imgPath[0], testOptions);
      
      const testResults = await Promise.all(
        results.map(async (result, index) => {
          const hexColors = await extractColors(result.buffer);
          const base64 = result.buffer.toString('base64');
          const dataUrl = `data:image/jpeg;base64,${base64}`;
          
          return {
            index,
            options: testOptions[index],
            image: dataUrl,
            colors: hexColors,
            cropInfo: result.cropInfo,
          };
        })
      );

      return NextResponse.json({
        result: true,
        data: {
          testMode: true,
          results: testResults,
        },
      });
    } else {
      // 일반 모드: 단일 크롭
      const options = cropOptions || { width: 120, height: 160, strategy: 'smart' };
      const cropResult = await cropImage(imgPath[0], options);
      const hexColors = await extractColors(cropResult.buffer);

      // Buffer → Base64 → Data URL
      const base64 = cropResult.buffer.toString('base64');
      const dataUrl = `data:image/jpeg;base64,${base64}`;

      return NextResponse.json({
        result: true,
        data: {
          image: dataUrl,
          colors: hexColors,
          cropInfo: cropResult.cropInfo,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { result: false, data: null, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
