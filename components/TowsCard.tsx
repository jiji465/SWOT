import React from 'react';
import type { TowsStrategy } from '../types';
import { SOIcon, STIcon, WOIcon, WTIcon } from './IconComponents';

interface TowsCardProps {
  strategy: TowsStrategy;
}

const strategyMeta = {
  SO: {
    color: 'accent-green',
    gradient: 'from-green-500/10 to-transparent',
    icon: <SOIcon className="h-10 w-10"/>,
  },
  ST: {
    color: 'accent-blue',
    gradient: 'from-blue-500/10 to-transparent',
    icon: <STIcon className="h-10 w-10"/>,
  },
  WO: {
    color: 'accent-orange',
    gradient: 'from-orange-500/10 to-transparent',
    icon: <WOIcon className="h-10 w-10"/>,
  },
  WT: {
    color: 'accent-red',
    gradient: 'from-red-500/10 to-transparent',
    icon: <WTIcon className="h-10 w-10"/>,
  },
};

export const TowsCard: React.FC<TowsCardProps> = ({ strategy }) => {
  const meta = strategyMeta[strategy.type];
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 hover:scale-[1.01] transition-transform duration-300">
      <div className={`p-8 bg-gradient-to-br ${meta.gradient}`}>
        <div className="flex items-center mb-4">
          <div className={`text-${meta.color} mr-4`}>
            {meta.icon}
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{strategy.title}</h4>
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-lg mb-4">{strategy.strategy}</p>
      </div>
      <div className="mt-auto bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-base text-slate-500 dark:text-slate-400 flex items-start">
          <span className="font-bold mr-2 text-slate-600 dark:text-slate-300">👉 Racional:</span>
          <span>{strategy.rationale}</span>
        </p>
      </div>
    </div>
  );
};