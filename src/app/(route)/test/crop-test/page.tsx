'use client';

import { useState } from 'react';

interface CropResult {
  index: number;
  options: any;
  image: string;
  colors: string[];
  cropInfo: {
    x: number;
    y: number;
    width: number;
    height: number;
    originalWidth: number;
    originalHeight: number;
  };
}

const SAMPLE_COUPANG_IMAGES = [
  'https://static.coupangcdn.com/image/affiliate/banner/3a9f7985f016914daf5d8c05655c0b1b@2x.jpg',
  'https://image5.coupangcdn.com/image/affiliate/banner/0cdc72fd2f4364f9a5478ee86d235460@2x.jpg',
  'https://image13.coupangcdn.com/image/affiliate/banner/5ad8c2a31d83ca65cad70efd4284f473@2x.jpg',
  'https://image8.coupangcdn.com/image/affiliate/banner/a95574ee253626dc495f2051976e94d3@2x.jpg',
  'https://image11.coupangcdn.com/image/affiliate/banner/8c8f1f9f9e02f1797a60182f81c7608e@2x.jpg',
  'https://image14.coupangcdn.com/image/affiliate/banner/56782e689d426f4420546c0e6e143ec5@2x.jpg'
];

export default function CropTestPage() {
  const [imageUrl, setImageUrl] = useState(SAMPLE_COUPANG_IMAGES[0]);
  const [results, setResults] = useState<CropResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testCrop = async () => {
    if (!imageUrl.trim()) {
      setError('이미지 URL을 입력해주세요');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/v1/image-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imgPath: [imageUrl],
          testMode: true,
        }),
      });

      const data = await response.json();

      if (data.result) {
        setResults(data.data.results);
      } else {
        setError(data.error || '처리 중 오류가 발생했습니다');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const getStrategyLabel = (options: any) => {
    const { width, height, aspectRatio, strategy, topPadding, bottomPadding } = options;
    let label = `${width}×${height} (${strategy})`;
    if (aspectRatio) {
      label += ` - 비율: ${aspectRatio.toFixed(2)}`;
    }
    if (topPadding || bottomPadding) {
      label += ` - 패딩: 상${Math.round((topPadding || 0) * 100)}% 하${Math.round((bottomPadding || 0) * 100)}%`;
    }
    return label;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">쿠팡 이미지 크롭 테스트</h1>
      
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">샘플 쿠팡 이미지 선택:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {SAMPLE_COUPANG_IMAGES.map((url, index) => (
              <button
                key={index}
                onClick={() => setImageUrl(url)}
                className={`p-2 border rounded-lg text-sm ${
                  imageUrl === url ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                샘플 {index + 1}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="쿠팡 이미지 URL을 입력하세요"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={testCrop}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '처리 중...' : '테스트 시작'}
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}
      </div>

      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">크롭 결과 비교</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div key={result.index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">
                  옵션 {result.index + 1}: {getStrategyLabel(result.options)}
                </h3>
                
                <div className="mb-3">
                  <img
                    src={result.image}
                    alt={`크롭 결과 ${result.index + 1}`}
                    className="w-full border rounded"
                  />
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <div>크롭 위치: ({result.cropInfo.x}, {result.cropInfo.y})</div>
                  <div>크롭 크기: {result.cropInfo.width} × {result.cropInfo.height}</div>
                  <div>원본 크기: {result.cropInfo.originalWidth} × {result.cropInfo.originalHeight}</div>
                </div>
                
                <div className="mb-2">
                  <div className="text-sm font-medium mb-1">추출된 색상:</div>
                  <div className="flex gap-1">
                    {result.colors.slice(0, 5).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">사용법:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>쿠팡 상품 이미지 URL을 입력하세요</li>
          <li>"테스트 시작" 버튼을 클릭하세요</li>
          <li>다양한 크롭 옵션으로 처리된 결과를 비교해보세요</li>
          <li>가장 적절한 크롭 결과를 선택하여 옵션을 조정하세요</li>
        </ol>
        
        <h3 className="font-bold mt-4 mb-2">크롭 전략 설명:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>smart:</strong> AI 기반 스마트 크롭 (상품이 잘 보이도록)</li>
          <li><strong>middle:</strong> 중앙 기준 크롭 (패딩 적용 후)</li>
          <li><strong>패딩:</strong> 상단/하단에서 제외할 영역 비율 (예: 상10% 하10%)</li>
        </ul>
        
        <h3 className="font-bold mt-4 mb-2">쿠팡 이미지 최적화:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>상단 패딩: 쿠팡 로고나 브랜드명 제거</li>
          <li>하단 패딩: 가격 정보나 구매 버튼 제거</li>
          <li>권장 설정: <code>width: 120, height: 160, strategy: 'smart', topPadding: 0.15, bottomPadding: 0.1</code></li>
        </ul>
      </div>
    </div>
  );
}
