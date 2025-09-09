'use client';

import { useToast } from '@/contexts/ToastContext';
import Toast from './Toast';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
          index={index}
        />
      ))}
    </div>
  );
}
