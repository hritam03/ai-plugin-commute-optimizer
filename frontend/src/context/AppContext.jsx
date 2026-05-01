import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({ area: '', maxRent: '' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <AppContext.Provider value={{ toast, showToast, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
};
