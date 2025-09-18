
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, SettingsIcon } from './IconComponents';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
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
    <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
       <button
        onClick={onOpenSettings}
        className="p-2 rounded-full bg-card/50 backdrop-blur-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
        aria-label="Open settings"
      >
        <SettingsIcon />
      </button>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-card/50 backdrop-blur-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};
