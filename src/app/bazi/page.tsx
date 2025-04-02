'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import BaziForm from '@/components/bazi/BaziForm';
import BaziResult from '@/components/bazi/BaziResult';
import { BaziInput, BaziResult as BaziResultType } from '@/lib/bazi/types';

export default function BaziPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BaziResultType | null>(null);

  const handleSubmit = async (data: BaziInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/bazi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '사주팔자 계산 중 오류가 발생했습니다.');
      }

      const resultData = await response.json();
      setResult(resultData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '사주팔자 계산 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-teal-50 to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl relative z-10 border border-emerald-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">사주팔자 계산</h1>
            <p className="text-emerald-700">생년월일시를 입력하여 운세를 확인해보세요</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          <BaziForm onSubmit={handleSubmit} loading={loading} />

          {result && <BaziResult result={result} />}
        </div>
      </div>
    </Layout>
  );
} 