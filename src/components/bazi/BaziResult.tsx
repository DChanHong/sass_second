'use client';

import { BaziResult } from '@/lib/bazi/types';
import { motion } from 'framer-motion';

interface BaziResultProps {
  result: BaziResult;
}

export default function BaziResult({ result }: BaziResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">사주팔자</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-700">{result.yearPillar.heavenlyStem}</div>
            <div className="text-2xl font-bold text-emerald-700">{result.yearPillar.earthlyBranch}</div>
            <div className="text-sm text-gray-600">년주</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-700">{result.monthPillar.heavenlyStem}</div>
            <div className="text-2xl font-bold text-emerald-700">{result.monthPillar.earthlyBranch}</div>
            <div className="text-sm text-gray-600">월주</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-700">{result.dayPillar.heavenlyStem}</div>
            <div className="text-2xl font-bold text-emerald-700">{result.dayPillar.earthlyBranch}</div>
            <div className="text-sm text-gray-600">일주</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-700">{result.hourPillar.heavenlyStem}</div>
            <div className="text-2xl font-bold text-emerald-700">{result.hourPillar.earthlyBranch}</div>
            <div className="text-sm text-gray-600">시주</div>
          </div>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">성격과 운세</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-700">생명의 별</div>
            <div className="text-xl font-bold text-emerald-700">{result.lifeStar}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">신체의 별</div>
            <div className="text-xl font-bold text-emerald-700">{result.bodyStar}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">숨은 별</div>
            <div className="text-xl font-bold text-emerald-700">{result.hiddenStars.join(', ')}</div>
          </div>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">오행 분석</h3>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(result.elements).map(([element, value]) => (
            <div key={element} className="text-center">
              <div className="text-xl font-bold text-emerald-700">{element}</div>
              <div className="text-sm text-gray-600">{value}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">운세 해석</h3>
        <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
      </div>
    </motion.div>
  );
} 