import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './IconComponents';

export const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-slate-900"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};