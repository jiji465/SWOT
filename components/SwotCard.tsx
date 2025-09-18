import React from 'react';
import { CheckCircleIcon } from './IconComponents';

interface SwotCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  colorClass: string;
}

export const SwotCard: React.FC<SwotCardProps> = ({ title, items, icon, colorClass }) => {
  const borderClass = `border-${colorClass}`;

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-t-8 ${borderClass}`}>
      <div className="flex items-center mb-6">
        <div className={`text-${colorClass} mr-4`}>
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className={`flex-shrink-0 text-${colorClass} mt-1.5 mr-3`}>
               <CheckCircleIcon className="h-6 w-6" />
            </div>
            <span className="text-slate-600 dark:text-slate-300 text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};