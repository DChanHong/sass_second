'use client';

import { useEffect, useState } from 'react';
import { Toast as ToastType } from '@/types/toast';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
  index: number;
}

export default function Toast({ toast, onRemove, index }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 애니메이션 시작
    const timer = setTimeout(() => setIsVisible(true), 50);
    
    // 자동 제거 타이머
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300); // 애니메이션 완료 후 제거
    }, toast.duration || 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, toast.duration, onRemove]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: '✅'
        };
      case 'error':
        return {
          icon: '❌'
        };
      case 'warning':
        return {
          icon: '⚠️'
        };
      default:
        return {
          icon: 'ℹ️'
        };
    }
  };

  const styles = getToastStyles();
  const bottomPosition = 20 + (index * 80); // 각 토스트마다 80px씩 위로 배치

  return (
    <div
      className={`
        fixed left-1/2 transform -translate-x-1/2 z-50
        bg-black/80 backdrop-blur-sm
        text-white px-6 py-4 rounded-xl shadow-lg
        w-[90%] max-w-[400px]
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ bottom: `${bottomPosition}px` }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl flex-shrink-0">{styles.icon}</span>
        <p className="font-medium text-sm leading-5 break-words flex-1">
          {toast.message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
          }}
          className="text-white/80 hover:text-white transition-colors ml-2 flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
