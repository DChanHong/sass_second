'use client';

import { useState } from 'react';
import { moodDeaungList } from '@/mockupData/coupang';
import NotFound from '@/app/not-found';

const Page = () => {
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [colorArr, setColorArr] = useState<string[]>([]);

  const test = async () => {

    
    const res = await fetch('/api/v1/image-analyze', {
      method: 'POST',
      body: JSON.stringify({ imgPath: [moodDeaungList[0]?.imgPath] }),
    });

    const data = await res.json();
    if (data?.result) {
      setCroppedImg(data.data.image);
      setColorArr(data.data.colors);
    }
  };

  if (process.env.NODE_ENV !== "development") {
    return <NotFound />;
  }

  return (
    <div className="p-4 space-y-4">
      <button
        type="button"
        onClick={test}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        자른 이미지 & 색상 미리보기
      </button>

      {croppedImg && (
        <div>
          <p className="mb-2 text-sm text-gray-600">✅ Sharp로 자른 이미지:</p>
          <img src={croppedImg} alt="Cropped Preview" className="border rounded w-[120px]" />
        </div>
      )}

      {colorArr.length > 0 && (
        <div>
          <p className="mt-4 text-sm text-gray-600">🎨 추출된 색상:</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {colorArr.map((color, idx) => (
              <div
                key={idx}
                title={color}
                className="w-10 h-10 border rounded"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
