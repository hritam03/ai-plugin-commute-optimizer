import React, { useEffect, useState } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiX } from 'react-icons/hi';

const ICONS = {
  success: <HiCheckCircle className="text-green-500 text-xl flex-shrink-0" />,
  error: <HiXCircle className="text-red-500 text-xl flex-shrink-0" />,
  info: <HiInformationCircle className="text-blue-500 text-xl flex-shrink-0" />,
};

const BORDERS = {
  success: 'border-l-4 border-green-500',
  error: 'border-l-4 border-red-500',
  info: 'border-l-4 border-blue-500',
};

const Toast = ({ message, type = 'info' }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] bg-white shadow-xl rounded-xl px-4 py-3 flex items-center gap-3 max-w-sm ${BORDERS[type]} animate-[fadeIn_0.2s_ease]`}
      role="alert"
    >
      {ICONS[type]}
      <span className="text-sm text-gray-800 flex-1">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
        aria-label="Close"
      >
        <HiX className="text-base" />
      </button>
    </div>
  );
};

export default Toast;
