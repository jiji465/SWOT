
import React from 'react';

interface SwotQuadrantProps {
  title: string;
  items: string[];
  // FIX: Changed icon prop type from React.ReactNode to React.ReactElement.
  // This is a more specific type that ensures the passed icon is a cloneable React element
  // and allows adding props like className, resolving the TypeScript error.
  icon: React.ReactElement;
  colorClass: string;
  isVisible: boolean;
}

export const SwotCard: React.FC<SwotQuadrantProps> = ({ title, items, icon, colorClass, isVisible }) => {
  const borderClass = `border-${colorClass}`;

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-800/50 rounded-lg shadow-lg p-6 border-l-4 ${borderClass} transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center mb-4">
        <div className={`text-${colorClass} mr-3`}>
          {React.cloneElement(icon, { className: "h-7 w-7" })}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className={`flex-shrink-0 font-semibold text-${colorClass} mr-2 mt-1`}>•</span>
            <span className="text-slate-600 dark:text-slate-300 text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
